import { FirebaseError } from "firebase/app";
import { User, updatePassword } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

import If from "~/core/ui/If";

import { useRouter } from "next/router";
import { useSignInWithToken } from "~/core/firebase/hooks/use-sign-in-with-token";
import { getFirebaseErrorCode } from "~/core/firebase/utils/get-firebase-error-code";
import useCreateServerSideSession from "~/core/hooks/use-create-server-side-session";
import { isSumolingActivated } from "~/lib/appsumo/hooks/is-sumo-ling-activated";
import { isTokenExpired } from "~/lib/appsumo/hooks/is-token-expired";
import { setSumolingActivated } from "~/lib/appsumo/hooks/set-sumo-ling-activated";
import AppSumoEmailPasswordActivateForm from "./AppSumoEmailPasswordActivateForm";
import AuthErrorMessage from "./AuthErrorMessage";

const AppSumoEmailPasswordActivateContainer: React.FCC<{
  onSubmit: () => unknown;
  onError?: (error: FirebaseError) => unknown;
}> = ({ onSubmit, onError }) => {
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

      onSubmit();
    },
    [onSubmit, sessionRequest],
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
          //* Update user because firstly authorize user with token
          //* then user will sign in with this password
          await updatePassword(user, params.password);

          await setSumolingActivated(user.uid, true);
        }

        setRedirecting(true);

        await createSession(user);
      }
    },
    [authToken, signInWithToken, loading, createSession],
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
