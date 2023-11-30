// react
import { saveAs } from "file-saver";
import { FC } from "react";
// import { useUser } from "reactfire";
// import { toast } from "sonner";
import Badge from "~/core/ui/Badge";

// ui-components
import Button from "~/core/ui/Button";
import If from "~/core/ui/If";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/core/ui/Table";
// import useSendTicket from "~/lib/projects/hooks/use-send-ticket";

// types
import PROJECT_STATUSES, { ERROR_PROJECT_STATUSES, TicketErrorType } from "~/lib/projects/statuses";
import { Project } from "~/lib/projects/types/project";
import ProjectCountdown from "./ProjectCountdown";

interface ProjectsTableProps {
  projects: WithId<Project>[];
}

export const ProjectsTable: FC<ProjectsTableProps> = (props) => {
  const { projects } = props;

  // const { data: user, status: fetchUserStatus } = useUser();
  // const sendTicket = useSendTicket();

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

  const isButtonDisabled = (projectStatus: PROJECT_STATUSES) => {
    return projectStatus !== PROJECT_STATUSES.translated;
  };

  const handleDownloadTranslatedFile = (translatedFileLink: string) => {
    const filename = translatedFileLink.split("/").pop();
    saveAs(translatedFileLink, filename);
  };

  const isStatusWithError = (status: PROJECT_STATUSES) => {
    return ERROR_PROJECT_STATUSES.includes(status);
  };

  // const handleReport = (projectId: string, status: PROJECT_STATUSES) => {
  //   if (fetchUserStatus === "success" && user !== null) {
  //     sendTicket(user.uid, user.email!, projectId, status as TicketErrorType);
  //   } else {
  //     toast.error("Something went wrong");
  //   }
  // };

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
        {projects?.map(
          ({
            id,
            name,
            targetLanguage,
            originalFileLink,
            translatedFileLink,
            status,
            createdAt,
          }) => (
            <TableRow key={id}>
              {/* Project Fields Values */}
              <TableCell>{name}</TableCell>
              <TableCell>{targetLanguage}</TableCell>
              <TableCell>
                <Badge className="w-fit" color={getStatusColor(status)}>
                  <span>{status}</span>
                  <If
                    condition={[PROJECT_STATUSES.translating, PROJECT_STATUSES.uploaded].includes(
                      status,
                    )}
                  >
                    <ProjectCountdown
                      createdAt={createdAt.toDate()}
                      originalFileLink={originalFileLink}
                    />
                  </If>
                </Badge>
              </TableCell>
              {/* TODO: add func to convert Firebase Timestamp to date string */}
              <TableCell>{createdAt.toDate().toDateString()}</TableCell>

              {/* Project Buttons */}
              <TableCell className="flex flex-row gap-5">
                {isStatusWithError(status) ? (
                  <Button
                    href="mailto:help@audioland.io"
                    // onClick={() => handleReport(id, status)}
                  >
                    Report
                  </Button>
                ) : (
                  <>
                    <Button
                      disabled={isButtonDisabled(status)}
                      onClick={() => handleDownloadTranslatedFile(translatedFileLink)}
                    >
                      Download
                    </Button>
                    <Button disabled={isButtonDisabled(status)} href={`/projects/${id}`}>
                      View
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};
