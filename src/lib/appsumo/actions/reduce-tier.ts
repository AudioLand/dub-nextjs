import { buildSumolingSubscription } from "~/lib/appsumo/hooks/build-sumo-ling-subscription";
import { updateSumoLingSubscriptionByUUID } from "~/lib/appsumo/hooks/update-sumo-ling-subscription-by-uuid";

export const reduceTier = (uuid: string, planId: string) => {
  const sumolingSubscription = buildSumolingSubscription(planId);

  return updateSumoLingSubscriptionByUUID(uuid, sumolingSubscription);
};
