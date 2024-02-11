import { getSumolingOrganizationByUUID } from "./get-sumo-ling-organization-by-uuid";

export const setSumolingActivated = async (uuid: string) => {
  const sumolingRef = await getSumolingOrganizationByUUID(uuid);

  return sumolingRef.update({
    isSumolingActivated: true,
  });
};
