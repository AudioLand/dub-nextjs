import { OrganizationSubscription } from "~/lib/organizations/types/organization-subscription";
import { SumolingSubscription } from "../types/sumo-ling-subscription";
import { getSumolingOrganizationRefByUUID } from "./get-sumo-ling-organization-ref-by-uuid";

export const updateSumoLingSubscriptionByUUID = async (
  uuid: string,
  subscription: SumolingSubscription,
) => {
  const organization = await getSumolingOrganizationRefByUUID(uuid);

  return organization.update({
    subscription: subscription as OrganizationSubscription,
  });
};
