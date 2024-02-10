import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import { useCallback, useEffect, useRef } from "react";
import useSWRMutation from "swr/mutation";

import If from "~/core/ui/If";

import { useSignUpWithEmailAndPassword } from "~/core/firebase/hooks";
import { getFirebaseErrorCode } from "~/core/firebase/utils/get-firebase-error-code";

import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import configuration from "~/configuration";
import { useApiRequest } from "~/core/hooks/use-api";
import useCreateServerSideSession from "~/core/hooks/use-create-server-side-session";
import { SumolingSubscription } from "~/lib/appsumo/sumo-ling-subscription";
import AppSumoEmailPasswordActivateForm from "./AppSumoEmailPasswordActivateForm";
import AuthErrorMessage from "./AuthErrorMessage";

const AppSumoEmailPasswordActivateContainer: React.FCC<{
  onSignUp: () => unknown;
  onError?: (error: FirebaseError) => unknown;
}> = ({ onSignUp, onError }) => {
  const router = useRouter();
  const [sessionRequest, sessionState] = useCreateServerSideSession();
  const [signUp, state] = useSignUpWithEmailAndPassword();
  const redirecting = useRef(false);

  const planId = router.query.plan_id as string;
  const activationEmail = router.query.activation_email as string;
  const uuid = router.query.uuid as string;
  const invoiceItemUUID = router.query.invoice_item_uuid as string;

  const sumolingSubscription = buildSumolingSubscription(planId);

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
    },
    [sessionRequest],
  );

  useEffect(() => {
    callOnErrorCallback();
  }, [callOnErrorCallback]);

  //#region Onboarding
  const onboarding = useCompleteOnboardingRequest();
  const onboardingReq = useCallback(async () => {
    // Get next token reset date
    const newNextTokenResetDate = new Date();
    newNextTokenResetDate.setMonth(newNextTokenResetDate.getMonth() + 1);
    const newNextTokenResetTimestamp = Timestamp.fromDate(newNextTokenResetDate);

    const data = {
      organization: "Sumo-ling",
      nextTokenResetDate: newNextTokenResetTimestamp.toMillis(),
      sumolingUUID: uuid,
      invoiceItemUUID: invoiceItemUUID,
      sumolingSubscription: sumolingSubscription,
    };
    console.log("container", data);

    await onboarding.trigger(data);
  }, [onboarding, invoiceItemUUID, uuid, sumolingSubscription]);
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

      redirecting.current = true;

      onSignUp();
    },
    [onSignUp, loading, signUp, onboardingReq, createSession],
  );

  return (
    <>
      <If condition={state.error}>
        {(error) => <AuthErrorMessage error={getFirebaseErrorCode(error)} />}
      </If>

      <AppSumoEmailPasswordActivateForm
        onSubmit={onSubmit}
        loading={loading}
        redirecting={redirecting.current}
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

const STRIPE_PRODUCTS = configuration.stripe.products;

const buildSumolingSubscription = (planId: string) => {
  const subscriptionPlan = STRIPE_PRODUCTS.find((product) => product.appsumoTier == planId);
  const subscription: SumolingSubscription = {
    product: subscriptionPlan!.stripeProductId!,
    status: "active",
  };
  return subscription;
};
