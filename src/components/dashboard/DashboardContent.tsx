// ui-components
import { ProjectsTable } from "./ProjectsTable";

// hooks
import { useUserSession } from "~/core/hooks/use-user-session";
import Button from "~/core/ui/Button";
import Spinner from "~/core/ui/Spinner";

// types
import { useState } from "react";
import useFetchProjects from "~/lib/projects/hooks/use-fetch-projects";
import CreateProjectModal from "./CreateProjectModal";

const DashboardContent = () => {
	const userSession = useUserSession();
	const userData = userSession!.data!;

	const [isCreateProjectModalOpen, setCreateProjectModelOpen] = useState<boolean>(false);
	const { data: projectsList, status } = useFetchProjects(userData.id!);

	const handleOpenCreateProjectModel = () => {
		setCreateProjectModelOpen(true);
	};

	return (
		<div className={"flex flex-col space-y-6 pb-36"}>
			<Button onClick={handleOpenCreateProjectModel}>Create new dub</Button>
			<CreateProjectModal
				isOpen={isCreateProjectModalOpen}
				setIsOpen={setCreateProjectModelOpen}
			/>

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
