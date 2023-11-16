import { Text } from "@react-email/components";
import { OrganizationSubscription } from "~/lib/organizations/types/organization-subscription";
import { renderEmailHtml } from "./render-email-html";

export const getSuccessfulSubscriptionAutoRenewEmailTemplate = (
  subscription: OrganizationSubscription,
) => {
  const periodEndAsDate = new Date(subscription.periodEndsAt * 1000);
  const nextBillingDate = periodEndAsDate.toDateString();

  const subject = "Your Audioland Subscription Renewed Successfully! ✅";

  const html = renderEmailHtml(
    <>
      <Text>Hi there!</Text>
      <br />

      <Text>
        Dima from Audioland here. Just wanted to drop a quick note to say your subscription has been
        renewed successfully. Your next billing date is {nextBillingDate}.
      </Text>
      <br />

      <Text>
        Keep enjoying seamless audio and video translations, and if you need anything, I&apos;m just
        an email away.
      </Text>
      <br />

      <Text>Cheers,</Text>
      <Text>Dima A</Text>
      <Text>CEO & Co-founder, Audioland</Text>
    </>,
  );

  return { subject, html };
};
