// hooks
import { useCurrentOrganization } from "~/lib/organizations/hooks/use-current-organization";

// constants
import { Progress, ProgressIndicator } from "@radix-ui/react-progress";
import { FC, useState } from "react";
import configuration from "~/configuration";
import Button from "~/core/ui/Button";
import If from "~/core/ui/If";

const TokensInfoCard = () => {
  // TODO: get used tokens from firebase
  const userOrganization = useCurrentOrganization();

  if (!userOrganization) return <></>;

  const userSubscription = userOrganization.subscription;
  const usedTokensInSeconds = userOrganization.usedTokensInSeconds!;

  //* For free plan
  if (!userSubscription) {
    const subscriptionProduct = configuration.stripe.products[0];

    return (
      <CardTemplate
        subscriptionName={subscriptionProduct.name}
        usedTokensInSeconds={usedTokensInSeconds}
        totalSubscriptionTokens={subscriptionProduct.tokens!}
      />
    );
  }

  //* For other plans
  const subscriptionProductId = userSubscription.product;
  const subscriptionProduct = configuration.stripe.products.find(
    (product) => product.id === subscriptionProductId,
  )!;

  const totalSubscriptionTokens = subscriptionProduct.tokens!;

  return (
    <CardTemplate
      subscriptionName={subscriptionProduct.name}
      usedTokensInSeconds={usedTokensInSeconds}
      totalSubscriptionTokens={totalSubscriptionTokens}
    />
  );
};

export default TokensInfoCard;

interface CardTemplateProps {
  subscriptionName: string;
  usedTokensInSeconds: number;
  totalSubscriptionTokens: number;
}

const CardTemplate: FC<CardTemplateProps> = (props) => {
  const { subscriptionName, usedTokensInSeconds, totalSubscriptionTokens } = props;

  const [isShowDetails, setShowDetails] = useState<boolean>(false);

  const roundedUsedTokens = Math.ceil(usedTokensInSeconds / 60);
  const usedTokensMinutes = Math.floor(usedTokensInSeconds / 60);
  const usedTokensSeconds = usedTokensInSeconds % 60;
  const progressIndicatorWidthInPercentage = (roundedUsedTokens / totalSubscriptionTokens) * 100;

  const showUpgradePlanButton = progressIndicatorWidthInPercentage > 65;

  const handleShowDetailsOnHover = () => {
    setShowDetails(true);
  };

  const handleHideDetailsOnHover = () => {
    setShowDetails(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        className="flex flex-col gap-2 py-2 pb-3 px-4 bg-gray-900 rounded"
        onMouseEnter={handleShowDetailsOnHover}
        onMouseLeave={handleHideDetailsOnHover}
      >
        <div className="flex justify-between">
          {/* Subscription Name */}
          <span className="text-lg font-semibold">{subscriptionName}</span>

          {/* Used tokens info */}
          <div className="flex items-center gap-1 text-md">
            <span>{roundedUsedTokens}</span>
            <span>/</span>
            <span>{totalSubscriptionTokens}</span>
            <span>tokens</span>
          </div>
        </div>

        <Progress className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
          <ProgressIndicator
            style={{
              width: `${progressIndicatorWidthInPercentage}%`,
            }}
            className="h-full bg-purple-500 duration-300 ease-in-out bg-white"
          />
        </Progress>

        <If condition={isShowDetails}>
          <div className="flex mt-1 text-gray-500 text-sm">
            {`Used ${usedTokensMinutes} min ${
              usedTokensSeconds > 0 && usedTokensSeconds + " sec "
            }from ${totalSubscriptionTokens} min`}
          </div>
        </If>
      </div>

      <If condition={showUpgradePlanButton}>
        <Button className="font-semibold" href="/settings/subscription">
          Upgrade Plan
        </Button>
      </If>
    </div>
  );
};
