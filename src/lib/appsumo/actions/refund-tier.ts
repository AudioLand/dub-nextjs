import { deleteSumoLingSubscriptionByUUID } from "~/lib/appsumo/hooks/delete-sumo-ling-subscription-by-uuid";

export const refundTier = (uuid: string, invoiceItemUUID: string) => {
  return deleteSumoLingSubscriptionByUUID(uuid, invoiceItemUUID);
};
