import { CollectionReference, collection, limit, orderBy, query, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { INVOICES_COLLECTION } from "~/lib/firestore-collections";
import { SumolingInvoice } from "../types/sumo-ling-data";

export const useFetchSumolingLastInvoiceItemByUUID = (sumolingUUID: string) => {
  const firestore = useFirestore();

  const collectionRef = collection(firestore, INVOICES_COLLECTION) as CollectionReference<
    WithId<SumolingInvoice>
  >;

  const whereConstraint = where("uuid", "==", sumolingUUID);
  const orderConstraint = orderBy("timestamp", "desc");
  const limitConstraint = limit(1);

  const invoicesQuery = query<WithId<SumolingInvoice>>(
    collectionRef,
    whereConstraint,
    // orderConstraint,
    // limitConstraint,
  );

  const { data: invoices, status } = useFirestoreCollectionData<WithId<SumolingInvoice>>(
    invoicesQuery,
    {
      idField: "id",
    },
  );

  if (status === "success") {
    if (invoices.length > 0) {
      return invoices[0];
    }
  }

  return undefined;
};
