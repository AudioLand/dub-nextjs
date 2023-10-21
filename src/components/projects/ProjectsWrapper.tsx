import ProjectsList from "./ProjectsList";
import Spinner from "~/core/ui/Spinner";

import { useUserSession } from "~/core/hooks/use-user-session";

const ProjectsWrapper = () => {
  const userSession = useUserSession();
  const userId = userSession?.data?.id;

  if (userId === undefined) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className={"flex flex-col space-y-6 pb-36"}>
      <ProjectsList userId={userId} />
    </div>
  );
}

export default ProjectsWrapper;
