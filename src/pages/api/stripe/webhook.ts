import { NextApiRequest, NextApiResponse } from "next";
import getRawBody from "raw-body";
import type { Stripe } from "stripe";

import logger from "~/core/logger";
import { getStripeInstance } from "~/core/stripe/get-stripe";
import { StripeWebhooks } from "~/core/stripe/stripe-webhooks.enum";

import {
  throwBadRequestException,
  throwInternalServerErrorException,
} from "~/core/http-exceptions";

import { withAdmin } from "~/core/middleware/with-admin";
import { withExceptionFilter } from "~/core/middleware/with-exception-filter";
import { withMethodsGuard } from "~/core/middleware/with-methods-guard";
import { withPipe } from "~/core/middleware/with-pipe";

import {
  deleteOrganizationSubscription,
  resetTokensByCustomerId,
  setOrganizationSubscription,
  updateSubscriptionById,
} from "~/lib/server/organizations/subscriptions";

import { buildOrganizationSubscription } from "~/lib/stripe/build-organization-subscription";

const SUPPORTED_HTTP_METHODS: HttpMethod[] = ["POST"];
const STRIPE_SIGNATURE_HEADER = "stripe-signature";

// NB: we disable body parser to receive the raw body string. The raw body
// is fundamental to verify that the request is genuine
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecretKey = process.env.STRIPE_WEBHOOK_SECRET as string;

/**
 * @description Handle the webhooks from Stripe related to checkouts
 */
async function checkoutWebhooksHandler(req: NextApiRequest, res: NextApiResponse) {
  if (!webhookSecretKey) {
    return throwInternalServerErrorException(
      `The variable STRIPE_WEBHOOK_SECRET is unset. Please add the STRIPE_WEBHOOK_SECRET environment variable`,
    );
  }

  const signature = req.headers[STRIPE_SIGNATURE_HEADER];

  // verify signature header is not missing
  if (!signature) {
    return throwBadRequestException(`No signature header found`);
  }

  const rawBody = await getRawBody(req);
  const stripe = await getStripeInstance();

  const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecretKey);

  logger.info(
    {
      type: event.type,
    },
    `[Stripe] Received Stripe Webhook`,
  );

  try {
    switch (event.type) {
      case StripeWebhooks.Completed: {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = session.subscription as string;
        // const userEmail = session.customer_email;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        await onCheckoutCompleted(session, subscription);

        // if (userEmail) {
        //   const subscriptionEmail = getEventEmailText(
        //     FEATURES_IDS_LIST.emailTexts.successful_subscription,
        //   );

        //   sendEmail({
        //     to: userEmail,
        //     subject: subscriptionEmail.subject,
        //     text: subscriptionEmail.text,
        //   });
        // } else {
        //   console.error("User email is not defined in Stripe session");
        // }

        break;
      }

      case StripeWebhooks.SubscriptionDeleted: {
        const subscription = event.data.object as Stripe.Subscription;

        await deleteOrganizationSubscription(subscription.id);

        break;
      }

      case StripeWebhooks.SubscriptionUpdated: {
        const subscription = event.data.object as Stripe.Subscription;

        await onSubscriptionUpdated(subscription);

        break;
      }

      case StripeWebhooks.InvoicePaid: {
        const invoice = event.data.object as Stripe.Invoice;
        // const userEmail = invoice.customer_email;

        await onSubscriptionContinued(invoice);

        // if (userEmail) {
        //   const subscriptionRenewalEmail = getEventEmailText(
        //     FEATURES_IDS_LIST.emailTexts.successful_subscription_renewal,
        //   );

        //   sendEmail({
        //     to: userEmail,
        //     subject: subscriptionRenewalEmail.subject,
        //     text: subscriptionRenewalEmail.text,
        //   });
        // } else {
        //   console.error("User email is not defined in Stripe paid invoice event");
        // }

        break;
      }

      case StripeWebhooks.InvoicePaymentFailed: {
        // const invoice = event.data.object as Stripe.Invoice;
        // const userEmail = invoice.customer_email;

        // if (userEmail) {
        //   const paymentFailedEmail = getEventEmailText(
        //     FEATURES_IDS_LIST.emailTexts.notification_of_a_failed_payment_attempt,
        //   );

        //   sendEmail({
        //     to: userEmail,
        //     subject: paymentFailedEmail.subject,
        //     text: paymentFailedEmail.text,
        //   });
        // } else {
        //   console.error("User email is not defined in Stripe failed invoice event");
        // }

        break;
      }
    }

    return respondOk(res);
  } catch (e) {
    logger.error(
      {
        type: event.type,
      },
      `[Stripe] Webhook handling failed`,
    );

    logger.debug(e);

    return throwInternalServerErrorException();
  }
}

export default function stripeCheckoutsWebhooksHandler(req: NextApiRequest, res: NextApiResponse) {
  const handler = withPipe(
    withMethodsGuard(SUPPORTED_HTTP_METHODS),
    withAdmin,
    checkoutWebhooksHandler,
  );

  return withExceptionFilter(req, res)(handler);
}

/**
 * @description When the checkout is completed, we store the order. The
 * subscription is only activated if the order was paid successfully.
 * Otherwise, we have to wait for a further webhook
 */
async function onCheckoutCompleted(
  session: Stripe.Checkout.Session,
  subscription: Stripe.Subscription,
) {
  const organizationId = session.client_reference_id as string;
  const customerId = session.customer as string;

  // build organization subscription and set on the organization document
  // we add just enough data in the DB, so we do not query
  // Stripe for every bit of data
  // if you need your DB record to contain further data
  // add it to {@link buildOrganizationSubscription}
  const subscriptionData = buildOrganizationSubscription(subscription);

  return setOrganizationSubscription({
    organizationId,
    customerId,
    subscription: subscriptionData,
  });
}

async function onSubscriptionUpdated(subscription: Stripe.Subscription) {
  const subscriptionData = buildOrganizationSubscription(subscription);

  return updateSubscriptionById(subscription.id, subscriptionData);
}

async function onSubscriptionContinued(invoice: Stripe.Invoice) {
  return resetTokensByCustomerId(invoice.customer as string);
}

function respondOk(res: NextApiResponse) {
  res.status(200).send({ success: true });
}
