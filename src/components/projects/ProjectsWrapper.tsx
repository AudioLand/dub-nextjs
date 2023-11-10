// react
import { FC, useState } from "react";

// ui-components
import Alert, { AlertHeading } from "~/core/ui/Alert";
import Button from "~/core/ui/Button";
import Modal from "~/core/ui/Modal";
import Spinner from "~/core/ui/Spinner";
import CreateProjectForm from "./CreateProjectForm";
import ProjectsList from "./ProjectsList";

// hooks
import { useUserId } from "~/core/hooks/use-user-id";
import { useCurrentOrganization } from "~/lib/organizations/hooks/use-current-organization";
import useIsUserCanCreateDubs from "~/lib/projects/hooks/use-is-user-can-create-dubs";

const ProjectsWrapper = () => {
  const userId = useUserId();
  const userOrganization = useCurrentOrganization();
  const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState<boolean>(false);

  const handleOpenCreateProjectModal = () => {
    setCreateProjectModalOpen(true);
  };

  const handleCloseCreateProjectModal = () => {
    setCreateProjectModalOpen(false);
  };

  if (userId === undefined || userOrganization === undefined) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className={"flex flex-col space-y-6 pb-36"}>
        <ProjectsWrapperHeader handleOpenCreateProjectModal={handleOpenCreateProjectModal} />
        <ProjectsList userId={userId} />
      </div>

      <Modal
        heading="New Project"
        isOpen={isCreateProjectModalOpen}
        setIsOpen={setCreateProjectModalOpen}
      >
        <CreateProjectForm
          userId={userId}
          organizationId={userOrganization.id}
          handleClose={handleCloseCreateProjectModal}
        />
      </Modal>
    </>
  );
};

export default ProjectsWrapper;

interface ProjectsWrapperHeaderProps {
  handleOpenCreateProjectModal: () => void;
}

const ProjectsWrapperHeader: FC<ProjectsWrapperHeaderProps> = (props) => {
  const { handleOpenCreateProjectModal } = props;

  const { isUserCanCreateNewDubs, fetchProjectsCountStatus } = useIsUserCanCreateDubs();

  return (
    <>
      {isUserCanCreateNewDubs ? (
        <Button className="w-full" onClick={handleOpenCreateProjectModal}>
          Create Project
        </Button>
      ) : (
        <FreePlanExceededAlert />
      )}
    </>
  );
};

const FreePlanExceededAlert = () => (
  <Alert type="warn">
    <AlertHeading>You exceeded your free plan</AlertHeading>

    <div>
      <p className="mb-3 mt-2">Please upgrade your plan to continue creating new projects.</p>
      <Button href="/settings/subscription">Upgrade plan</Button>
    </div>
  </Alert>
);
