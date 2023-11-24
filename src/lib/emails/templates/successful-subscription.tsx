import { Text } from "@react-email/components";
import configuration from "~/configuration";
import { OrganizationSubscription } from "~/lib/organizations/types/organization-subscription";
import { renderEmailHtml } from "../hooks/render-email-html";

const STRIPE_PRODUCTS = configuration.stripe.products;

export const getSuccessfulSubscriptionEmailTemplate = (
  subscription: OrganizationSubscription,
) => {
  const userSubscriptionPlan = STRIPE_PRODUCTS.find(
    (product) => product.stripeProductId === subscription.product,
  );
  const subscriptionPlanName = userSubscriptionPlan?.name;
  const subscriptionPlanFeatures = userSubscriptionPlan?.features;

  const subject = `You're All Set! Welcome to ${subscriptionPlanName} 🚀`;

  const html = renderEmailHtml(
    <>
      <Text>Hi there!</Text>
      <br />

      <Text>
        This is Dima from Audioland. I&apos;m thrilled to let you know that your subscription to our
        {subscriptionPlanName} plan is active. Get ready to experience audio and video translation
        like never before!
      </Text>
      <br />

      <Text>Your plan includes:</Text>
      <ul>{subscriptionPlanFeatures?.map((feature, index) => <li key={index}>{feature}</li>)}</ul>
      <br />

      <Text>Any questions or feedback? I&apos;m just an email away.</Text>
      <br />

      <Text>Happy translating,</Text>
      <Text>Dima A</Text>
      <Text>CEO & Co-founder, Audioland</Text>
    </>,
  );

  return { subject, html };
};
