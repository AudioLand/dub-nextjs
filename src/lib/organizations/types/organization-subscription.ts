import type { Stripe } from "stripe";

export interface OrganizationSubscription {
  id: string;
  priceId: string;

  // TODO: fix "product" name because it is id of the product
  product: string | null;
  subscriptionItemId: string;

  status: Stripe.Subscription.Status;
  cancelAtPeriodEnd: boolean;
  currency: string | null;

  interval: string | null;
  intervalCount: number | null;

  createdAt: UnixTimestamp;
  periodStartsAt: UnixTimestamp;
  periodEndsAt: UnixTimestamp;
  trialStartsAt: UnixTimestamp | null;
  trialEndsAt: UnixTimestamp | null;
}
