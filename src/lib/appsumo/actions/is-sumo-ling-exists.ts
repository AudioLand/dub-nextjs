import { getOrganizationsCollection } from "~/lib/server/collections";

export const isSumolingExists = async (uuid: string) => {
  const { size } = await getOrganizationsCollection()
    .where("sumolingUUID", "==", uuid)
    .limit(1)
    .get();

  return size > 0;
};
