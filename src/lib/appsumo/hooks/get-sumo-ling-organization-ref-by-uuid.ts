import { getOrganizationsCollection } from "~/lib/server/collections";

export const getSumolingOrganizationRefByUUID = async (uuid: string) => {
  const { docs, size } = await getOrganizationsCollection()
    .where("sumolingUUID", "==", uuid)
    .limit(1)
    .get();

  if (!size) {
    throw new Error(`No organization found with sumolingUUID ${uuid}`);
  }

  return docs[0].ref;
};
