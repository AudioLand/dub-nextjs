// react

// ui-components
import { ProjectsTable } from "./ProjectsTable";

// hooks
import { useUserSession } from "~/core/hooks/use-user-session";
import Spinner from "~/core/ui/Spinner";

// types
import useFetchProjects from "~/lib/projects/hooks/use-fetch-projects";

const DashboardContent = () => {
	const userSession = useUserSession();
	const userData = userSession!.data!;

	const { data: projectsList, status } = useFetchProjects(userData.id!);

	return (
		<div className={"flex flex-col space-y-6 pb-36"}>
			{status === "loading" ? (
				// TODO: center this spinner
				<Spinner />
			) : (
				<ProjectsTable projects={projectsList} />
			)}
		</div>
	);
};

export default DashboardContent;
