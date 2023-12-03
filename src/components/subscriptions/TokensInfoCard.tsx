// ui-components
import { Progress, ProgressIndicator } from "@radix-ui/react-progress";
import Button from "~/core/ui/Button";
import If from "~/core/ui/If";

// hooks
import useUserSubscriptionPlan from "~/lib/user/hooks/use-user-subscription-plan";
import useUserTokens from "~/lib/user/hooks/use-user-tokens";

const TokensInfoCard = () => {
  const { userSubscriptionPlan, isFreePlan } = useUserSubscriptionPlan();
  const { usedTokens, availableTokensInSubscription, fetchUsedTokensStatus } = useUserTokens();

  if (fetchUsedTokensStatus === "loading") return <></>;

  const progressIndicatorWidthInPercentage =
    (usedTokens.roundedInMinutes / availableTokensInSubscription.inMinutes) * 100;
  //* Show upgrade button if tokens less than 35%
  const showUpgradePlanButton = progressIndicatorWidthInPercentage > 65 || isFreePlan;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 py-2 pb-3 px-4 bg-gray-100 dark:bg-gray-900 rounded">
        <div className="flex justify-between">
          {/* Subscription Name */}
          <span className="text-lg font-semibold">{userSubscriptionPlan.name}</span>

          {/* Used tokens info */}
          <div className="flex items-center gap-1 text-md">
            <span>{usedTokens.roundedInMinutes}</span>
            <span>/</span>
            <span>{availableTokensInSubscription.inMinutes}</span>
            <span>tokens</span>
          </div>
        </div>

        <Progress className="h-2 w-full overflow-hidden rounded-full bg-gray-500 dark:bg-gray-800">
          <ProgressIndicator
            className="h-2 bg-purple-700 duration-300 ease-in-out"
            style={{
              width: `${progressIndicatorWidthInPercentage}%`,
            }}
          />
        </Progress>

        <div className="flex mt-1 text-gray-500 text-sm">
          {usedTokens.secondsLeft > 0
            ? `Used ${usedTokens.roundedInMinutes} min ${usedTokens.secondsLeft} sec from ${availableTokensInSubscription.inMinutes} min`
            : `Used ${usedTokens.roundedInMinutes} min from ${availableTokensInSubscription.inMinutes} min`}
        </div>
      </div>

      <If condition={showUpgradePlanButton}>
        <Button className="font-semibold" href="/settings/subscription">
          Upgrade Plan
        </Button>
      </If>
    </div>
  );
};

export default TokensInfoCard;
