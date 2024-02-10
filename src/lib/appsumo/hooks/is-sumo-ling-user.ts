import { useCurrentOrganization } from "~/lib/organizations/hooks/use-current-organization";

export const useIsSumolingUser = () => {
  const organization = useCurrentOrganization();
  const isSumolingUser = organization?.sumolingUUID !== undefined;
  return isSumolingUser;
};
