// hooks
import { useUserId } from "~/core/hooks/use-user-id";
import useIsSubscriptionActive from "~/lib/organizations/hooks/use-is-subscription-active";
import useFetchProjects from "./use-fetch-projects";

// constants
import { MAX_PROJECTS_COUNT_FOR_FREE_PLAN } from "../limits";

const useIsUserCanCreateDubs = () => {
  const userId = useUserId();
  const isSubscriptionActive = useIsSubscriptionActive();
  const { data: userProjects, status: fetchProjectsCountStatus } = useFetchProjects(userId!);

  const userProjectsCount = userProjects?.length || 0;
  const isUserExceededFreeProjectsCount = userProjectsCount >= MAX_PROJECTS_COUNT_FOR_FREE_PLAN;
  const isUserCanCreateNewDubs = isSubscriptionActive || !isUserExceededFreeProjectsCount;

  return {
    isUserCanCreateNewDubs,
    fetchProjectsCountStatus,
  };
};

export default useIsUserCanCreateDubs;
