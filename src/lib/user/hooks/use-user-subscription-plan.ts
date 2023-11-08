import configuration from "~/configuration";
import { useCurrentOrganization } from "~/lib/organizations/hooks/use-current-organization";

const STRIPE_PRODUCTS = configuration.stripe.products;
const FREE_PLAN_PRODUCT = STRIPE_PRODUCTS[0];

const useUserSubscriptionPlan = () => {
  const userSubscription = useCurrentOrganization()?.subscription;
  const userSubscriptionProductId = userSubscription?.product;

  //* For free plan
  if (!userSubscriptionProductId) {
    return {
      userSubscriptionPlan: FREE_PLAN_PRODUCT,
      isFreePlan: true,
    };
  }

  //* For other plans
  const userSubscriptionPlan = STRIPE_PRODUCTS.find(
    (product) => product.stripeProductId === userSubscriptionProductId,
  )!;

  return {
    userSubscriptionPlan: userSubscriptionPlan,
    isFreePlan: false,
  };
};

export default useUserSubscriptionPlan;
