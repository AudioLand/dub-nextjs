import dynamic from "next/dynamic";
import React from "react";

import configuration from "~/configuration";
import Button, { ButtonProps } from "~/core/ui/Button";

const BILLING_PORTAL_REDIRECT_ENDPOINT = configuration.paths.api.billingPortal;

const CSRFTokenInput = dynamic(() => import("./CsrfTokenInput"), {
  ssr: false,
});

const BillingPortalRedirectButton: React.FCC<{
  customerId: string;
  className?: string;
  variant?: ButtonProps["variant"];
  subscriptionId?: string;
  redirectToStripePaywall?: boolean;
}> = ({
  children,
  customerId,
  subscriptionId,
  className,
  variant,
  redirectToStripePaywall = false,
}) => {
  const valueOfRedirectToStripePaywallField = Number(
    redirectToStripePaywall && Boolean(subscriptionId),
  );

  return (
    <form method="POST" action={BILLING_PORTAL_REDIRECT_ENDPOINT}>
      <CSRFTokenInput />

      <input type={"hidden"} name={"customerId"} value={customerId} />
      <input type={"hidden"} name={"subscriptionId"} value={subscriptionId} />
      <input
        type={"hidden"}
        name={"redirectToStripePaywall"}
        value={valueOfRedirectToStripePaywallField}
        readOnly
      />

      <Button variant={variant} className={className}>
        <span className={"flex items-center space-x-2"}>
          <span>{children}</span>

          {/* <ArrowRightIcon className={"h-4"} /> */}
        </span>
      </Button>
    </form>
  );
};

export default BillingPortalRedirectButton;
