import {
  CollectionReference,
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ORGANIZATIONS_COLLECTION } from "~/lib/firestore-collections";
import { Organization } from "~/lib/organizations/types/organization";

export const setSumolingActivated = async (uuid: string, isActivated: boolean) => {
  const firestore = getFirestore();

  const collectionRef = collection(firestore, ORGANIZATIONS_COLLECTION) as CollectionReference<
    WithId<Organization>
  >;

  const constraint = where("sumolingUUID", "==", uuid);
  const organizationsQuery = query<WithId<Organization>>(collectionRef, constraint);

  const organizationSnapshot = await getDocs(organizationsQuery);
  const sumolingOrganizationRef = organizationSnapshot.docs[0].ref;

  return await updateDoc(sumolingOrganizationRef, {
    isSumolingActivated: isActivated,
  });
};
