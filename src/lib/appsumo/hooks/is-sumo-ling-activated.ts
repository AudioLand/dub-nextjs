import { getSumolingOrganizationByUUID } from "./get-sumo-ling-organization-by-uuid";

export const isSumolingActivated = async (uuid: string) => {
  const sumolingRef = await getSumolingOrganizationByUUID(uuid);
  const sumoling = await sumolingRef.get();
  const sumolingData = sumoling.data();
  const isSumolingActivated = sumolingData?.isSumolingActivated;

  return isSumolingActivated;
};
