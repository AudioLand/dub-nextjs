import { useState, useEffect } from "react";

import PageLoadingIndicator from "~/core/ui/PageLoadingIndicator";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
	SelectLabel,
} from "~/core/ui/Select";
import Alert from "~/core/ui/Alert";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import Button from "~/core/ui/Button";

import useFetchProject from "~/lib/projects/hooks/use-fetch-project";

// types
import { UserProject } from "~/lib/projects/types/project";

const ProjectItem: React.FC<{
	projectId: string;
}> = ({ projectId }) => {
	const { data: project, status } = useFetchProject(projectId);

	const [mediaSource, setMediaSource] = useState("translated");

	useEffect(() => {
		if (project) {
			// TODO temporary added hardcoded media
			project.output =
				"https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4";
			project.input =
				"https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";
		}
	}, [project]);

	if (status === "loading") {
		return <PageLoadingIndicator>Loading Project...</PageLoadingIndicator>;
	}

	if (status === "error") {
		return (
			<Alert type={"error"}>
				Sorry, we encountered an error while fetching your project.
			</Alert>
		);
	}

	return (
		<div>
			<div className={"flex flex-1"}>
				<Button size={"small"} color={"transparent"} href={"/dashboard"}>
					<ArrowLeftIcon className={"mr-2 h-4"} />
					Back to Dashboard
				</Button>
				<div className={"max-w-xs"}>
					<Select defaultValue={mediaSource} onValueChange={setMediaSource}>
						<SelectTrigger>{mediaSource}</SelectTrigger>

						<SelectContent>
							<SelectItem value={"translated"}>Translated</SelectItem>
							<SelectItem value={"origin"}>Origin</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className={"flex justify-center"}>
				<div className={"flex flex-1 flex-col space-y-0.5 max-w-4xl"}>
					<video
						controls
						src={mediaSource === "translated" ? project.output : project.input}
					/>
					<div>{project.name}</div>
					<div>{project.language}</div>
					<div>{project.status}</div>
					<div>{project.createdAt.toDate().toDateString()}</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectItem;
