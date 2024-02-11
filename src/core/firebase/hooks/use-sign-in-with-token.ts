import { useCallback } from "react";

import { FirebaseError } from "firebase/app";
import type { UserCredential } from "firebase/auth";
import { useAuth } from "reactfire";

import { useRequestState } from "../../hooks/use-request-state";

export function useSignInWithToken() {
  const auth = useAuth();

  const { state, setLoading, setData, setError } = useRequestState<UserCredential, FirebaseError>();

  const signInWithToken = useCallback(
    async (token: string) => {
      setLoading(true);

      try {
        const { signInWithCustomToken } = await import("firebase/auth");

        const credential = await signInWithCustomToken(auth, token);

        setData(credential);

        return credential;
      } catch (error) {
        setError(error as FirebaseError);
      }
    },
    [auth, setData, setError, setLoading],
  );

  return [signInWithToken, state] as [typeof signInWithToken, typeof state];
}
