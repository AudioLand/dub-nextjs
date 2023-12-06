/**
 * @name StripeWebhooks
 * @description A list of Stripe webhooks topics. Add new webhooks here.
 */
export enum StripeWebhooks {
  Completed = "checkout.session.completed",
  SubscriptionDeleted = "customer.subscription.deleted",
  SubscriptionUpdated = "customer.subscription.updated",
  InvoicePaid = "invoice.paid",
  InvoicePaymentFailed = "invoice.payment_failed",
  InvoiceUpcoming = "invoice.upcoming",
}
