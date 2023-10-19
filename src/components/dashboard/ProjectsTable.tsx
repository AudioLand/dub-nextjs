// react
import { FC } from "react";
import Button from "~/core/ui/Button";

// ui-components
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/core/ui/Table";
import { UserProject } from "~/lib/projects/types/project";

// types

interface ProjectsTableProps {
	projects: UserProject[];
}

export const ProjectsTable: FC<ProjectsTableProps> = (props) => {
	const { projects } = props;

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Language</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Created at</TableHead>
					<TableHead></TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{projects?.map(({ id, name, language, status, createdAt }) => (
					<TableRow key={id}>
						<TableCell>{name}</TableCell>
						<TableCell>{language}</TableCell>
						<TableCell>{status}</TableCell>
						<TableCell>{createdAt.toDate().toDateString()}</TableCell>
						<TableCell className="flex flex-row gap-5">
							<Button variant="destructive">Remove</Button>
							<Button>Download</Button>
							<Button>View</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
