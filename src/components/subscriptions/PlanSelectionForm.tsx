import { Trans } from "next-i18next";
import React from "react";

import BillingPortalRedirectButton from "~/components/subscriptions/BillingRedirectButton";
import CheckoutRedirectButton from "~/components/subscriptions/CheckoutRedirectButton";

import { Organization } from "~/lib/organizations/types/organization";

import { IfHasPermissions } from "~/components/IfHasPermissions";
import { canChangeBilling } from "~/lib/organizations/permissions";

import PricingTable from "~/components/PricingTable";
import Alert from "~/core/ui/Alert";
import Button from "~/core/ui/Button";
import If from "~/core/ui/If";

const PlanSelectionForm: React.FCC<{
  organization: WithId<Organization>;
}> = ({ organization }) => {
  const customerId = organization.customerId;

  return (
    <div className={"flex flex-col space-y-6"}>
      <IfHasPermissions condition={canChangeBilling} fallback={<NoPermissionsAlert />}>
        <div className={"flex w-full flex-col space-y-8"}>
          <PricingTable
            CheckoutButton={(props) => {
              if (props.isFree) {
                return <Button variant="outline">Enjoy!!</Button>;
              }

              return (
                <CheckoutRedirectButton
                  organizationId={organization.id}
                  customerId={customerId}
                  stripePriceId={props.stripePriceId}
                  recommended={props.recommended}
                >
                  <Trans i18nKey={"subscriptions:checkout"} defaults={"Checkout"} />
                </CheckoutRedirectButton>
              );
            }}
          />

          <If condition={customerId}>
            <div className={"flex flex-col space-y-2"}>
              <BillingPortalRedirectButton customerId={customerId as string}>
                <Trans i18nKey={"subscription:manageBilling"} />
              </BillingPortalRedirectButton>

              <span className={"text-xs text-gray-500 dark:text-gray-400"}>
                <Trans i18nKey={"subscription:manageBillingDescription"} />
              </span>
            </div>
          </If>
        </div>
      </IfHasPermissions>
    </div>
  );
};

export default PlanSelectionForm;

function NoPermissionsAlert() {
  return (
    <Alert type={"warn"}>
      <Alert.Heading>
        <Trans i18nKey={"subscription:noPermissionsAlertHeading"} />
      </Alert.Heading>

      <Trans i18nKey={"subscription:noPermissionsAlertBody"} />
    </Alert>
  );
}
