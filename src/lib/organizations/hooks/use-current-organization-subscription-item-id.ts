import { useCurrentOrganization } from "./use-current-organization";

const useCurrentOrganizationSubscriptionItemId = () => {
  const currentOrganization = useCurrentOrganization();
  const subscription = currentOrganization?.subscription;
  return subscription?.subscriptionItemId;
};

export default useCurrentOrganizationSubscriptionItemId;
