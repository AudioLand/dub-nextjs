import { getAuth } from "firebase-admin/auth";
import { Timestamp } from "firebase-admin/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import getRestFirestore from "~/core/firebase/admin/get-rest-firestore";
import { withAdmin } from "~/core/middleware/with-admin";
import withCsrf from "~/core/middleware/with-csrf";
import { withExceptionFilter } from "~/core/middleware/with-exception-filter";
import { withMethodsGuard } from "~/core/middleware/with-methods-guard";
import { withPipe } from "~/core/middleware/with-pipe";
import { buildSumolingSubscription } from "~/lib/appsumo/hooks/build-sumo-ling-subscription";
import { SumolingInvoice } from "~/lib/appsumo/types/sumo-ling-data";
import { MembershipRole } from "~/lib/organizations/types/membership-role";
import { OrganizationSubscription } from "~/lib/organizations/types/organization-subscription";
import {
  getOrganizationsCollection,
  getSumolingsInvoicesCollection,
  getUsersCollection,
} from "~/lib/server/collections";

const Body = z.object({
  userId: z.string(),
  planId: z.string(),
  uuid: z.string(),
  invoiceItemUUID: z.string(),
});

async function sumolingOnboardingHandler(req: NextApiRequest, res: NextApiResponse) {
  const body = await Body.parseAsync(req.body);
  const auth = getAuth();
  const { userId, planId, uuid, invoiceItemUUID } = body;

  const firestore = getRestFirestore();
  const batch = firestore.batch();

  // Create user in firestore
  const userRef = getUsersCollection().doc(userId);

  // Create organization in firestore
  const organizationRef = getOrganizationsCollection().doc(uuid);
  const organizationMembers = {
    [userId]: {
      user: userRef,
      role: MembershipRole.Owner,
    },
  };

  // Create sumo-ling ivoice in firestore
  const sumolingInvoiceRef = getSumolingsInvoicesCollection().doc();
  const invoiceTimestamp = Timestamp.fromDate(new Date());
  const sumolingInvoice: SumolingInvoice = {
    planId,
    uuid,
    invoiceItemUUID,
    timestamp: invoiceTimestamp.toMillis(),
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

    subscription: sumolingSubscription as OrganizationSubscription,
    sumolingUUID: uuid,
    isSumolingActivated: true,
  });

  batch.set(userRef, {});

  batch.set(sumolingInvoiceRef, sumolingInvoice);

  await batch.commit();

  await auth.setCustomUserClaims(userId, {
    onboarded: true,
  });

  return res.status(200).send({
    success: true,
  });
}

const SUPPORTED_HTTP_METHODS: HttpMethod[] = ["POST"];

export default function completeSumolingOnboardingHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const handler = withPipe(
    withCsrf(),
    withMethodsGuard(SUPPORTED_HTTP_METHODS),
    withAdmin,
    sumolingOnboardingHandler,
  );

  return withExceptionFilter(req, res)(handler);
}
