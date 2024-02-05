// firebase
import { FieldValue, Timestamp } from "firebase-admin/firestore";

// hooks
import { OrganizationSubscription } from "~/lib/organizations/types/organization-subscription";
import { getOrganizationsCollection } from "~/lib/server/collections";

interface AddSubscriptionProps {
  organizationId: string;
  customerId: string;
  subscription: OrganizationSubscription;
}

/**
 * @name setOrganizationSubscription
 * @description Adds or updates a subscription to an Organization
 */
export function setOrganizationSubscription(props: AddSubscriptionProps) {
  const { customerId, subscription, organizationId } = props;
  const organization = getOrganizationsCollection().doc(organizationId);

  return organization.update({
    subscription,
    customerId,
  });
}

/**
 * @name deleteOrganizationSubscription
 * @description Removes a subscription from an organization by
 * Stripe subscription ID
 * @param subscriptionId
 */
export async function deleteOrganizationSubscription(subscriptionId: string) {
  const organization = await getOrganizationBySubscriptionId(subscriptionId);

  return organization.update({
    subscription: FieldValue.delete(),
    nextTokenResetDate: null,
    usedTokensInSeconds: 0,
  });
}

/**
 * @name updateSubscriptionById
 * @default Update subscription with ID {@link subscriptionId} with data
 * object {@link subscription}
 * @param subscriptionId
 * @param subscription
 */
export async function updateSubscriptionById(
  subscriptionId: string,
  subscription: OrganizationSubscription,
) {
  const organization = await getOrganizationBySubscriptionId(subscriptionId);

  return organization.update({
    subscription,
  });
}

export async function setTokensResetDateByCustomerId(customerId: string) {
  const organizationSnap = await getOrganizationByCustomerId(customerId);
  const organizationRef = organizationSnap.ref;
  const organization = await organizationRef.get();
  const organizationData = organization.data();

  // Skip if user already had subscription
  if (organizationData?.nextTokenResetDate !== null || !organizationData.subscription) {
    return;
  }

  const nextTokenResetDate = new Date();
  const nextTokenResetMonth = nextTokenResetDate.getMonth();
  nextTokenResetDate.setMonth(nextTokenResetMonth + 1);
  const nextTokenResetTimestamp = Timestamp.fromDate(nextTokenResetDate);

  return organizationRef.update({
    nextTokenResetDate: nextTokenResetTimestamp.toMillis(),
  });
}

/**
 * @name getOrganizationBySubscriptionId
 * @description Retrieve a Firestore Organization given its
 * subscription ID {@link subscriptionId}. Throws an error when not found.
 * @param subscriptionId
 */
async function getOrganizationBySubscriptionId(subscriptionId: string) {
  const path = "subscription.id";
  const op = "==";

  const { docs, size } = await getOrganizationsCollection()
    .where(path, op, subscriptionId)
    .limit(1)
    .get();

  if (!size) {
    throw new Error(`No organization found with subscription ${subscriptionId}`);
  }

  return docs[0].ref;
}

/**
 * @description Retrieve an organization using the customer ID assigned by
 * Stripe after the first checkout, e,g. when the customer record is created
 * @param customerId
 */
export async function getOrganizationByCustomerId(customerId: string) {
  const organizations = getOrganizationsCollection();
  const path = `customerId`;
  const op = "==";

  const result = await organizations.where(path, op, customerId).get();

  return result.docs[0];
}
