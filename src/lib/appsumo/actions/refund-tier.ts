import { deleteSumoLingSubscriptionByUUID } from "~/lib/appsumo/hooks/delete-sumo-ling-subscription-by-uuid";
import { addSumolingInvoiceItem } from "../hooks/update-invoice-item-uuid";

export const refundTier = async (plaId: string, uuid: string, invoiceItemUUID: string) => {
  await addSumolingInvoiceItem(plaId, uuid, invoiceItemUUID);
  return deleteSumoLingSubscriptionByUUID(uuid);
};
