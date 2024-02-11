import {
  CollectionReference,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { ORGANIZATIONS_COLLECTION } from "~/lib/firestore-collections";
import { Organization } from "~/lib/organizations/types/organization";

export const getSumoLingOrganizationByUUID = async (uuid: string | undefined) => {
  const firestore = getFirestore();

  const collectionRef = collection(firestore, ORGANIZATIONS_COLLECTION) as CollectionReference<
    WithId<Organization>
  >;

  const constraint = where("sumolingUUID", "==", uuid);
  const organizationsQuery = query<WithId<Organization>>(collectionRef, constraint);

  const organizationSnapshot = await getDocs(organizationsQuery);
  const sumolingOrganization = organizationSnapshot.docs[0].data();

  return sumolingOrganization;
};
