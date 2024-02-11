import { FieldValue } from "firebase-admin/firestore";
import { getSumolingOrganizationByUUID } from "./get-sumo-ling-organization-by-uuid";

export const deleteSumoLingSubscriptionByUUID = async (uuid: string, invoiceItemUUID: string) => {
  const organization = await getSumolingOrganizationByUUID(uuid);

  return organization.update({
    nextTokenResetDate: null,
    usedTokensInSeconds: 0,
    subscription: FieldValue.delete(),
    invoiceItemUUID: FieldValue.delete(),
    sumolingUUID: FieldValue.delete(),
  });
};
