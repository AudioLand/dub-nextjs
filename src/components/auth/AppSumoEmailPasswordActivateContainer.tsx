import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import { useCallback, useEffect, useRef } from "react";
import useSWRMutation from "swr/mutation";

import If from "~/core/ui/If";

import { useSignUpWithEmailAndPassword } from "~/core/firebase/hooks";
import { getFirebaseErrorCode } from "~/core/firebase/utils/get-firebase-error-code";

import getClientQueryParams from "~/core/generic/get-client-query-params";
import { isBrowser } from "~/core/generic/is-browser";
import { useApiRequest } from "~/core/hooks/use-api";
import useCreateServerSideSession from "~/core/hooks/use-create-server-side-session";
import AppSumoEmailPasswordActivateForm from "./AppSumoEmailPasswordActivateForm";
import AuthErrorMessage from "./AuthErrorMessage";

const AppSumoEmailPasswordActivateContainer: React.FCC<{
  onSignUp: () => unknown;
  onError?: (error: FirebaseError) => unknown;
}> = ({ onSignUp, onError }) => {
  const [sessionRequest, sessionState] = useCreateServerSideSession();
  const [signUp, state] = useSignUpWithEmailAndPassword();
  const redirecting = useRef(false);

  const planId = useQueryParam("plan_id")!;
  const activationEmail = useQueryParam("activation_email")!;
  const uuid = useQueryParam("uuid")!;
  const invoiceItemUUID = useQueryParam("invoice_item_uuid")!;

  const loading = state.loading || sessionState.loading || redirecting.current;

  const callOnErrorCallback = useCallback(() => {
    if (state.error && onError) {
      onError(state.error);
    }
  }, [state.error, onError]);

  const createSession = useCallback(
    async (user: User) => {
      // using the ID token, we will make a request to initiate the session
      // to make SSR possible via session cookie
      await sessionRequest(user);

      redirecting.current = true;

      onSignUp();
    },
    [onSignUp, sessionRequest],
  );

  useEffect(() => {
    callOnErrorCallback();
  }, [callOnErrorCallback]);

  //#region Onboarding
  const onboarding = useCompleteOnboardingRequest();
  const onboardingCompleteRequested = useRef(false);
  const onboardingReq = useCallback(async () => {
    if (!onboardingCompleteRequested.current) {
      onboardingCompleteRequested.current = true;
      await onboarding.trigger({ organization: "Organization" });
    }
  }, [onboarding]);
  //#endregion

  const onSubmit = useCallback(
    async (params: { email: string; password: string }) => {
      if (loading) {
        return;
      }

      const credential = await signUp(params.email, params.password);

      if (credential) {
        await createSession(credential.user);
      }

      await onboardingReq();
    },
    [loading, signUp, onboardingReq, createSession],
  );

  return (
    <>
      <If condition={state.error}>
        {(error) => <AuthErrorMessage error={getFirebaseErrorCode(error)} />}
      </If>

      <AppSumoEmailPasswordActivateForm
        onSubmit={onSubmit}
        loading={loading}
        email={activationEmail}
      />
    </>
  );
};

export default AppSumoEmailPasswordActivateContainer;

// Сохранить текущий путь создания организации.
// -> Отправить запрос на /api/onboarding

//#region Onboarding

interface CompleteOnboardingStepData {
  organization: string;
}

function useCompleteOnboardingRequest() {
  const fetcher = useApiRequest<void, CompleteOnboardingStepData>();

  return useSWRMutation(
    "/api/onboarding",
    (path, { arg: body }: { arg: CompleteOnboardingStepData }) => {
      return fetcher({
        path,
        body,
      });
    },
  );
}
//#endregion

function useQueryParam(param: string) {
  if (!isBrowser()) {
    return undefined;
  }

  const params = getClientQueryParams();

  return params.get(param);
}
