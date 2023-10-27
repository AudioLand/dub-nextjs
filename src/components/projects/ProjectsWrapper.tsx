// react
import { useState } from "react";

// ui-components
import Alert, { AlertHeading } from "~/core/ui/Alert";
import Button from "~/core/ui/Button";
import Modal from "~/core/ui/Modal";
import Spinner from "~/core/ui/Spinner";
import CreateProjectModal from "./CreateProjectModal";
import ProjectsList from "./ProjectsList";

// hooks
import { useRouter } from "next/router";
import { useUserSession } from "~/core/hooks/use-user-session";
import useIsSubscriptionActive from "~/lib/organizations/hooks/use-is-subscription-active";
import useFetchProjectsCount from "~/lib/projects/hooks/use-fetch-projects-count";

// constants
import configuration from "~/configuration";

const MAX_PROJECTS_COUNT_FOR_FREE_PLAN = 3;

const ProjectsWrapper = () => {
  const router = useRouter();
  const userSession = useUserSession();
  const userId = userSession?.data?.id;
  const isSubscriptionActive = useIsSubscriptionActive();
  const { userProjectsCount, status } = useFetchProjectsCount(userId!);

  const isUserExceededFreeProjectsCount = userProjectsCount >= MAX_PROJECTS_COUNT_FOR_FREE_PLAN;
  const isUserCanCreateNewDubs = isSubscriptionActive || !isUserExceededFreeProjectsCount;

  const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState<boolean>(false);

  const redirectToPaywall = () => {
    const payWallPage = configuration.paths.settings.subscription;
    return router.push(payWallPage);
  };

  const handleOpenCreateProjectModal = () => {
    setCreateProjectModalOpen(true);
  };

  const handleCloseCreateProjectModal = () => {
    setCreateProjectModalOpen(false);
  };

  if (userId === undefined || status === "loading") {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className={"flex flex-col space-y-6 pb-36"}>
      {isUserCanCreateNewDubs ? (
        <Button className="w-full" onClick={handleOpenCreateProjectModal}>
          Create new dub
        </Button>
      ) : (
        <FreePlanExceededAlert />
      )}

      <Modal
        heading="Create a Dub"
        isOpen={isCreateProjectModalOpen}
        setIsOpen={setCreateProjectModalOpen}
      >
        <CreateProjectModal handleClose={handleCloseCreateProjectModal} />
      </Modal>

      <ProjectsList userId={userId} />
    </div>
  );
};

export default ProjectsWrapper;

const FreePlanExceededAlert = () => (
  <Alert type="warn">
    <AlertHeading>You exceeded your free plan</AlertHeading>

    {/* TODO: add normal alert text */}
    <div>
      <Button href="/settings/subscription">Upgrade plan</Button>
    </div>
  </Alert>
);
