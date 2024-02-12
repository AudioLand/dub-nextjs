import { deleteSumoLingSubscriptionByUUID } from "~/lib/appsumo/hooks/delete-sumo-ling-subscription-by-uuid";

export const refundTier = (uuid: string) => {
  return deleteSumoLingSubscriptionByUUID(uuid);
};
