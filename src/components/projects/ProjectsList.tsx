// react
import { FC } from "react";

// ui-components
import Spinner from "~/core/ui/Spinner";
import { ProjectsTable } from "./ProjectsTable";

// hooks
import useFetchProjects from "~/lib/projects/hooks/use-fetch-projects";

const ProjectsList: FC<{ userId: string }> = ({ userId }) => {
  const { data: projectsList, status } = useFetchProjects(userId);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className={"flex flex-col space-y-6 pb-36"}>
      <ProjectsTable projects={projectsList} />
    </div>
  );
};

export default ProjectsList;
