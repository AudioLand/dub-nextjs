// react
import { useState } from "react";

// ui-components
import Button from "~/core/ui/Button";
import Modal from "~/core/ui/Modal";
import Spinner from "~/core/ui/Spinner";
import CreateProjectModal from "./CreateProjectModal";
import ProjectsList from "./ProjectsList";

// hooks
import { useUserSession } from "~/core/hooks/use-user-session";

const ProjectsWrapper = () => {
  const userSession = useUserSession();
  const userId = userSession?.data?.id;

  const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState<boolean>(false);

  const handleOpenCreateProjectModal = () => {
    setCreateProjectModalOpen(true);
  };

  const handleCloseCreateProjectModal = () => {
    setCreateProjectModalOpen(false);
  };

  if (userId === undefined) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className={"flex flex-col space-y-6 pb-36"}>
      <Button onClick={handleOpenCreateProjectModal}>Create new dub</Button>
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
