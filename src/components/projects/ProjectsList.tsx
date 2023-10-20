// react
import { FC, useState } from "react";

// ui-components
import Button from "~/core/ui/Button";
import Modal from "~/core/ui/Modal";
import Spinner from "~/core/ui/Spinner";
import CreateProjectModal from "./CreateProjectModal";
import { ProjectsTable } from "./ProjectsTable";

// hooks
import useFetchProjects from "~/lib/projects/hooks/use-fetch-projects";

const ProjectsList: FC<{ userId: string}> = ({ userId }) => {
  const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState<boolean>(false);
  const { data: projectsList, status } = useFetchProjects(userId);

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
        // TODO: center this spinner
        <Spinner />
      ) : (
        <ProjectsTable projects={projectsList} />
      )}
    </div>
  );
};

export default ProjectsList;
