// react
import { FC } from "react";

// ui-components
import Button from "~/core/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/core/ui/Table";

// types
import { Project } from "~/lib/projects/types/project";

interface ProjectsTableProps {
  projects: Project[];
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
        {projects?.map(({ name, targetLanguage, status, createdAt }) => (
          // TODO: add func to convert Firebase Timestamp to date string
          <TableRow key={createdAt.toDate().toDateString()}>
            <TableCell>{name}</TableCell>
            <TableCell>{targetLanguage}</TableCell>
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
