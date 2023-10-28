// react
import { useState } from "react";

// ui-components
import Alert, { AlertHeading } from "~/core/ui/Alert";
import Button from "~/core/ui/Button";
import Modal from "~/core/ui/Modal";
import Spinner from "~/core/ui/Spinner";
import CreateProjectForm from "./CreateProjectForm";
import ProjectsList from "./ProjectsList";

// hooks
import useIsUserCanCreateDubs from "~/lib/projects/hooks/use-is-user-can-create-dubs";

// constants
import { useUserId } from "~/core/hooks/use-user-id";

const ProjectsWrapper = () => {
  const userId = useUserId();
  const { isUserCanCreateNewDubs, fetchProjectsCountStatus } = useIsUserCanCreateDubs();

  const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState<boolean>(false);

  const handleOpenCreateProjectModal = () => {
    setCreateProjectModalOpen(true);
  };

  const handleCloseCreateProjectModal = () => {
    setCreateProjectModalOpen(false);
  };

  if (userId === undefined || fetchProjectsCountStatus === "loading") {
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
        <CreateProjectForm handleClose={handleCloseCreateProjectModal} />
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
