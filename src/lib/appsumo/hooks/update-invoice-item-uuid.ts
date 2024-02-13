import { Timestamp } from "firebase-admin/firestore";
import { getSumolingsInvoicesCollection } from "~/lib/server/collections";

export const addSumolingInvoiceItem = async (
  planId: string,
  uuid: string,
  invoiceItemUUID: string,
) => {
  const invoicesCollection = getSumolingsInvoicesCollection();

  const timestamp = Timestamp.fromDate(new Date());

  return invoicesCollection.add({
    planId,
    uuid,
    invoiceItemUUID,
    timestamp: timestamp.toMillis(),
  });
};
