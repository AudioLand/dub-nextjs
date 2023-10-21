// react
import { FC } from "react";
import Badge from "~/core/ui/Badge";

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

import PROJECT_STATUSES from "~/lib/projects/statuses";

// types
import { Project } from "~/lib/projects/types/project";

interface ProjectsTableProps {
  projects: WithId<Project>[];
}

export const ProjectsTable: FC<ProjectsTableProps> = (props) => {
  const { projects } = props;

  const getStatusColor = (status: PROJECT_STATUSES) => {
    switch (status) {
      case PROJECT_STATUSES.uploading:
        return "normal";

      case PROJECT_STATUSES.uploaded:
        return "normal";

      case PROJECT_STATUSES.translating:
        return "info";

      case PROJECT_STATUSES.translated:
        return "success";
    }
  };

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
        {projects?.map(({ id, name, targetLanguage, status, createdAt }) => (
          <TableRow key={id}>
            {/* Project Fields Values */}
            <TableCell>{name}</TableCell>
            <TableCell>{targetLanguage}</TableCell>
            <TableCell>
              <Badge className="w-fit" color={getStatusColor(status)}>
                {status}
              </Badge>
            </TableCell>
            {/* TODO: add func to convert Firebase Timestamp to date string */}
            <TableCell>{createdAt.toDate().toDateString()}</TableCell>

            {/* Project Buttons */}
            <TableCell className="flex flex-row gap-5">
              <Button variant="destructive">Remove</Button>
              <Button>Download</Button>
              <Button
                disabled={status !== PROJECT_STATUSES.translated}
                href={`/projects/${id}`}
              >
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
