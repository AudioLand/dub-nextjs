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

  if (projectsList.length === 0) {
    return (
      <div className="flex flex-col w-full md:w-1/2 self-center items-center gap-5 pt-40 text-center">
        <span className="text-xl font-semibold text-gray-400">
          You&apos;re all set to begin your projects! Just click the &quot;Create Project&quot;
          button to kick things off and run your very first test.
        </span>
        <span className="text-gray-500">
          It might take a little time to process, so please bear with us while we work diligently to
          make this process faster than the blink of an eye. We&apos;re here to meet all your needs,
          and we&apos;d love to hear your thoughts, so please don&apos;t hesitate to reach out and
          share your feedback.
        </span>
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
