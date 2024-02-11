import { getSumoLingOrganizationByUUID } from "./get-sumo-ling-organization-by-uuid";

export const isSumolingActivated = async (uuid: string) => {
  const sumoling = await getSumoLingOrganizationByUUID(uuid);
  const isSumolingActivated = sumoling.isSumolingActivated;

  return isSumolingActivated;
};
