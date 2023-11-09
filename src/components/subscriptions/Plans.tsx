import { Trans } from "next-i18next";
import React from "react";

import { useCurrentOrganization } from "~/lib/organizations/hooks/use-current-organization";

import BillingPortalRedirectButton from "~/components/subscriptions/BillingRedirectButton";
import PlanSelectionForm from "~/components/subscriptions/PlanSelectionForm";

import If from "~/core/ui/If";
import SubscriptionCard from "./SubscriptionCard";

import { IfHasPermissions } from "~/components/IfHasPermissions";
import { canChangeBilling } from "~/lib/organizations/permissions";

const Plans: React.FC = () => {
  const organization = useCurrentOrganization();

  if (!organization) {
    return null;
  }

  const customerId = organization.customerId;
  const subscription = organization.subscription;

  if (!subscription) {
    return <PlanSelectionForm organization={organization} />;
  }

  return (
    <div className={"flex flex-col space-y-4"}>
      <SubscriptionCard subscription={subscription} />

      <IfHasPermissions condition={canChangeBilling}>
        <If condition={customerId}>
          <div className={"flex flex-col space-y-2"}>
            <div className="flex gap-5">
              {/* Upgrade Plan Button */}
              <BillingPortalRedirectButton
                customerId={customerId as string}
                subscriptionId={subscription.id}
                redirectToStripePaywall
              >
                Upgrade Plan
              </BillingPortalRedirectButton>

              {/* Go to Customer Portal Button */}
              <BillingPortalRedirectButton
                variant="secondary"
                customerId={customerId as string}
                subscriptionId={subscription.id}
              >
                <Trans i18nKey={"subscription:manageBilling"} />
              </BillingPortalRedirectButton>
            </div>

            <span className={"text-xs text-gray-500 dark:text-gray-400"}>
              <Trans i18nKey={"subscription:manageBillingDescription"} />
            </span>
          </div>
        </If>
      </IfHasPermissions>
    </div>
  );
};

export default Plans;
