import { STRIPE_PRODUCTS } from "~/lib/stripe/stripe-products";
import { SumolingSubscription } from "../sumo-ling-subscription";

export const buildSumolingSubscription = (planId: string) => {
  const subscriptionPlan = STRIPE_PRODUCTS.find((product) => product.appsumoTier == planId);

  if (!subscriptionPlan) {
    throw new Error(`AppSumo tier ${planId} is undefined`);
  }

  const subscription: SumolingSubscription = {
    product: subscriptionPlan!.stripeProductId!,
    status: "active",
  };
  return subscription;
};
