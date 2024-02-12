import { FieldValue } from "firebase-admin/firestore";
import { getSumolingOrganizationRefByUUID } from "./get-sumo-ling-organization-ref-by-uuid";

export const deleteSumoLingSubscriptionByUUID = async (uuid: string) => {
  const organization = await getSumolingOrganizationRefByUUID(uuid);

  return organization.update({
    nextTokenResetDate: null,
    usedTokensInSeconds: 0,
    subscription: FieldValue.delete(),
    invoiceItemUUID: FieldValue.delete(),
    sumolingUUID: FieldValue.delete(),
    isSumolingActivated: FieldValue.delete(),
  });
};
