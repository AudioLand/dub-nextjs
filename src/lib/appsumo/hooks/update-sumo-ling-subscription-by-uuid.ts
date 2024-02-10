import { OrganizationSubscription } from "~/lib/organizations/types/organization-subscription";
import { SumolingSubscription } from "../sumo-ling-subscription";
import { getSumolingOrganizationByUUID } from "./get-sumo-ling-organization-by-uuid";

export const updateSumoLingSubscriptionByUUID = async (
  uuid: string,
  subscription: SumolingSubscription,
  invoiceItemUUID: string,
) => {
  const organization = await getSumolingOrganizationByUUID(uuid);

  return organization.update({
    subscription: subscription as OrganizationSubscription,
    invoiceItemUUID,
  });
};
