// react
import { useFirestore, useFirestoreDocData } from "reactfire";

// firebase
import { DocumentReference, doc } from "firebase/firestore";

// constants
import { ORGANIZATIONS_COLLECTION } from "~/lib/firestore-collections";

// types
import type { Organization } from "../types/organization";

const useFetchOrganizationUsedTokens = (organizationId: string) => {
  const firestore = useFirestore();

  const ref = doc(firestore, ORGANIZATIONS_COLLECTION, organizationId) as DocumentReference<
    WithId<Organization>
  >;

  const { data: organization, status: fetchOrganizationStatus } = useFirestoreDocData<
    WithId<Organization>
  >(ref, { idField: "id" });

  return {
    usedTokensInSeconds: organization?.usedTokensInSeconds || 0,
    fetchUsedTokensStatus: fetchOrganizationStatus,
  };
};

export default useFetchOrganizationUsedTokens;
