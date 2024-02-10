import { getAuth } from "firebase-admin/auth";

import { MembershipRole } from "~/lib/organizations/types/membership-role";

import getRestFirestore from "~/core/firebase/admin/get-rest-firestore";
import { SumolingSubscription } from "~/lib/appsumo/sumo-ling-subscription";
import { OrganizationSubscription } from "~/lib/organizations/types/organization-subscription";
import { getOrganizationsCollection, getUsersCollection } from "../collections";

interface Params {
  organizationName: string;
  userId: string;
  nextTokenResetDate?: number | null;
  sumolingUUID?: string;
  invoiceItemUUID?: string;
  sumolingSubscription?: SumolingSubscription;
}

/**
 * @name completeOnboarding
 * @description Handles the submission of the onboarding flow. By default,
 * we use the submission to create the Organization and the user record
 * associated with the User who signed up using its ID
 * @param userId
 * @param organizationName
 */
export async function completeOnboarding({
  userId,
  organizationName,
  nextTokenResetDate = null,
  sumolingUUID,
  invoiceItemUUID,
  sumolingSubscription,
}: Params) {
  const firestore = getRestFirestore();
  const auth = getAuth();

  const batch = firestore.batch();

  const organizationRef = getOrganizationsCollection().doc();
  const userRef = getUsersCollection().doc(userId);

  const organizationMembers = {
    [userId]: {
      user: userRef,
      role: MembershipRole.Owner,
    },
  };

  const sumolingData = {
    sumolingUUID: sumolingUUID,
    invoiceItemUUID: invoiceItemUUID,
    subscription: sumolingSubscription as OrganizationSubscription,
  };

  const shouldAddSumolingData = sumolingUUID && invoiceItemUUID && sumolingSubscription;

  const organizationData = {
    name: organizationName,
    members: organizationMembers,
    usedTokensInSeconds: 0,
    nextTokenResetDate: nextTokenResetDate,
  };

  // create organization
  if (shouldAddSumolingData) {
    batch.create(organizationRef, {
      ...organizationData,
      ...sumolingData,
    });
  } else {
    batch.create(organizationRef, {
      ...organizationData,
    });
  }

  // Here we create the user's Firestore record
  // You can add any additional properties to the user object
  batch.set(userRef, {});

  await batch.commit();

  // we can set the user as "onboarded" using the custom claims
  // it helps with not having to query Firestore for each request
  await auth.setCustomUserClaims(userId, {
    onboarded: true,
  });
}
