import { FirebaseError } from "firebase/app";
import {
  Auth,
  EmailAuthProvider,
  User,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";

import If from "~/core/ui/If";

import { useRouter } from "next/router";
import { useSignInWithToken } from "~/core/firebase/hooks/use-sign-in-with-token";
import { getFirebaseErrorCode } from "~/core/firebase/utils/get-firebase-error-code";
import { useApiRequest } from "~/core/hooks/use-api";
import useCreateServerSideSession from "~/core/hooks/use-create-server-side-session";
import { isSumolingActivated } from "~/lib/appsumo/hooks/is-sumo-ling-activated";
import { isTokenExpired } from "~/lib/appsumo/hooks/is-token-expired";
import { setSumolingActivated } from "~/lib/appsumo/hooks/set-sumo-ling-activated";
import { SumolingSubscription } from "~/lib/appsumo/sumo-ling-subscription";
import AppSumoEmailPasswordActivateForm from "./AppSumoEmailPasswordActivateForm";
import AuthErrorMessage from "./AuthErrorMessage";
const AppSumoEmailPasswordActivateContainer: React.FCC<{
  onSumbit: () => unknown;
  onError?: (error: FirebaseError) => unknown;
}> = ({ onSumbit, onError }) => {
  const router = useRouter();
  const [sessionRequest, sessionState] = useCreateServerSideSession();
  const [signInWithToken, state] = useSignInWithToken();
  const [redirecting, setRedirecting] = useState<boolean>(false);

  const activationEmail = router.query.activation_email as string;
  const authToken = router.query.token as string;

  const loading = state.loading || sessionState.loading || redirecting;

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
    },
    [sessionRequest],
  );

  useEffect(() => {
    callOnErrorCallback();
  }, [callOnErrorCallback]);

  const onSubmitForm = useCallback(
    async (params: { email: string; password: string }) => {
      if (loading) {
        return;
      }

      if (isTokenExpired(authToken)) {
        throw Error("Token is expired");
      }

      const credential = await signInWithToken(authToken);

      if (credential) {
        const user = credential.user;

        const isActivated = await isSumolingActivated(user.uid);
        if (!isActivated) {
          await updatePassword(user, params.password);
          await setSumolingActivated(user.uid, true);
        }

        await createSession(user);
      }

      setRedirecting(true);

      onSumbit();
    },
    [onSumbit, authToken, signInWithToken, loading, createSession],
  );

  return (
    <>
      <If condition={state.error}>
        {(error) => <AuthErrorMessage error={getFirebaseErrorCode(error)} />}
      </If>

      <AppSumoEmailPasswordActivateForm
        onSubmit={onSubmitForm}
        loading={loading}
        redirecting={redirecting}
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
  nextTokenResetDate: number;
  sumolingUUID: string;
  invoiceItemUUID: string;
  sumolingSubscription: SumolingSubscription;
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

async function getCredential(auth: Auth, params: { email: string; password: string }) {
  const { email, password } = params;

  const user = auth.currentUser;

  if (user) {
    const credential = EmailAuthProvider.credential(email, password);

    return reauthenticateWithCredential(user, credential);
  }

  return signInWithEmailAndPassword(auth, email, password);
}
