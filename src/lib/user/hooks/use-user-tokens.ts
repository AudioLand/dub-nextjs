// hooks
import { useCurrentOrganization } from "~/lib/organizations/hooks/use-current-organization";
import useFetchOrganizationUsedTokens from "~/lib/organizations/hooks/use-fetch-organization-used-tokens";
import useUserSubscriptionPlan from "./use-user-subscription-plan";

const useUserTokens = () => {
  const userOrganization = useCurrentOrganization()!;
  // For realtime updates
  const { usedTokensInSeconds, fetchUsedTokensStatus } = useFetchOrganizationUsedTokens(
    userOrganization.id,
  );
  const { userSubscriptionPlan } = useUserSubscriptionPlan();

  const usedTokens = {
    inSeconds: usedTokensInSeconds,
    roundedInMinutes: Math.floor(usedTokensInSeconds / 60),
    secondsLeft: usedTokensInSeconds % 60,
  };
  const availableTokensInSubscription = {
    inMinutes: userSubscriptionPlan.tokens,
    inSeconds: userSubscriptionPlan.tokens * 60,
  };

  return {
    usedTokens,
    availableTokensInSubscription,
    fetchUsedTokensStatus,
  };
};

export default useUserTokens;
