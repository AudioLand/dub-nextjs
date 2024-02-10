import { getAuth } from "firebase-admin/auth";
import { Timestamp } from "firebase-admin/firestore";
import getRestFirestore from "~/core/firebase/admin/get-rest-firestore";
import { buildSumolingSubscription } from "~/lib/appsumo/hooks/build-sumo-ling-subscription";
import { MembershipRole } from "~/lib/organizations/types/membership-role";
import { OrganizationSubscription } from "~/lib/organizations/types/organization-subscription";
import { getOrganizationsCollection, getUsersCollection } from "~/lib/server/collections";

export const activateSumoling = async (
  planId: string,
  uuid: string,
  activationEmail: string,
  invoiceItemUUID: string,
) => {
  const auth = getAuth();

  try {
    const user = await auth.getUser(uuid);
  } catch (err: any) {
    const firestore = getRestFirestore();
    const batch = firestore.batch();
    // Create user in auth
    const user = await auth.createUser({
      uid: uuid,
      email: activationEmail,
    });

    // Create user
    const userRef = getUsersCollection().doc(uuid);

    // Create organization
    const organizationRef = getOrganizationsCollection().doc();
    const organizationMembers = {
      [uuid]: {
        user: userRef,
        role: MembershipRole.Owner,
      },
    };

    // Get next token reset date
    const newNextTokenResetDate = new Date();
    newNextTokenResetDate.setMonth(newNextTokenResetDate.getMonth() + 1);
    const newNextTokenResetTimestamp = Timestamp.fromDate(newNextTokenResetDate);

    const sumolingSubscription = buildSumolingSubscription(planId);

    // create organization
    batch.create(organizationRef, {
      name: "Sumo-ling",
      members: organizationMembers,
      usedTokensInSeconds: 0,
      nextTokenResetDate: newNextTokenResetTimestamp.toMillis(),
      sumolingUUID: uuid,
      invoiceItemUUID: invoiceItemUUID,
      subscription: sumolingSubscription as OrganizationSubscription,
    });

    batch.set(userRef, {});

    await batch.commit();

    await auth.setCustomUserClaims(uuid, {
      onboarded: true,
    });
  }

  const authToken = await auth.createCustomToken(uuid);

  return authToken;
};
