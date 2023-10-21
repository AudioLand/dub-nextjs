// react
import { useState } from "react";

// ui-components
import Button from "~/core/ui/Button";
import Modal from "~/core/ui/Modal";
import Spinner from "~/core/ui/Spinner";
import CreateProjectModal from "./CreateProjectModal";
import { ProjectsTable } from "./ProjectsTable";

// hooks
import { useUserSession } from "~/core/hooks/use-user-session";
import useFetchProjects from "~/lib/projects/hooks/use-fetch-projects";

const ProjectsList = () => {
  const userSession = useUserSession();
  const userData = userSession!.data!;

  const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState<boolean>(false);
  const { data: projectsList, status } = useFetchProjects(userData.id!);

  const handleOpenCreateProjectModal = () => {
    setCreateProjectModalOpen(true);
  };

  const handleCloseCreateProjectModal = () => {
    setCreateProjectModalOpen(false);
  };

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

      {status === "loading" ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <ProjectsTable projects={projectsList} />
      )}
    </div>
  );
};

export default ProjectsList;
