import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { useSignUpWithEmailAndPassword } from "~/core/firebase/hooks";
import { getFirebaseErrorCode } from "~/core/firebase/utils/get-firebase-error-code";
import { useApiRequest } from "~/core/hooks/use-api";
import useCreateServerSideSession from "~/core/hooks/use-create-server-side-session";
import If from "~/core/ui/If";
import { getSumolingDataFromToken } from "~/lib/appsumo/hooks/get-sumo-ling-data-from-token";
import AuthErrorMessage from "../AuthErrorMessage";
import AppSumoEmailPasswordActivateForm from "./AppSumoEmailPasswordActivateForm";

const AppSumoEmailPasswordActivateContainer: React.FCC<{
  onSubmit: () => unknown;
  onError?: (error: FirebaseError) => unknown;
}> = ({ onSubmit, onError }) => {
  const router = useRouter();
  const [sessionRequest, sessionState] = useCreateServerSideSession();
  const [signUpWithCredentials, state] = useSignUpWithEmailAndPassword();
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [sumolingOnboardingCompleteRequested, setSumolingOnboardingCompleteRequested] =
    useState<boolean>(false);

  const token = router.query.token as string;

  const { planId, uuid, activationEmail, invoiceItemUUID } = getSumolingDataFromToken(token);

  const loading =
    state.loading || sessionState.loading || redirecting || sumolingOnboardingCompleteRequested;

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

      onSubmit();
    },
    [onSubmit, sessionRequest],
  );

  useEffect(() => {
    callOnErrorCallback();
  }, [callOnErrorCallback]);

  //#region Onboarding
  const sumolingOnboarding = useCompleteSumolingOnboardingRequest();
  const sumolingOnboardingReq = useCallback(
    async (userId: string, planId: string, uuid: string, invoiceItemUUID: string) => {
      if (!sumolingOnboardingCompleteRequested) {
        setSumolingOnboardingCompleteRequested(true);

        await sumolingOnboarding.trigger({ userId, planId, uuid, invoiceItemUUID });
      }
    },
    [sumolingOnboarding, sumolingOnboardingCompleteRequested],
  );
  //#endregion

  const onSubmitForm = useCallback(
    async (params: { email: string; password: string }) => {
      if (loading) {
        return;
      }

      const credential = await signUpWithCredentials(params.email, params.password);

      if (credential) {
        const user = credential.user;

        await sumolingOnboardingReq(user.uid, planId, uuid, invoiceItemUUID);

        setRedirecting(true);

        await createSession(user);
      }
    },
    [
      planId,
      uuid,
      invoiceItemUUID,
      signUpWithCredentials,
      sumolingOnboardingReq,
      loading,
      createSession,
    ],
  );

  return (
    <>
      <If condition={state.error}>
        {(error) => <AuthErrorMessage error={getFirebaseErrorCode(error)} />}
      </If>

      <AppSumoEmailPasswordActivateForm
        onSubmitForm={onSubmitForm}
        loading={loading}
        redirecting={redirecting}
        email={activationEmail}
      />
    </>
  );
};

export default AppSumoEmailPasswordActivateContainer;

interface CompleteSumolingOnboarding {
  userId: string;
  planId: string;
  uuid: string;
  invoiceItemUUID: string;
}

function useCompleteSumolingOnboardingRequest() {
  const fetcher = useApiRequest<void, CompleteSumolingOnboarding>();

  return useSWRMutation(
    "/api/appsumo/activate",
    (path, { arg: body }: { arg: CompleteSumolingOnboarding }) => {
      return fetcher({
        path,
        body,
      });
    },
  );
}
//#endregion
