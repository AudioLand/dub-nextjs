// react
import { FC, useState } from "react";

// ui-components
import Alert, { AlertHeading } from "~/core/ui/Alert";
import Button from "~/core/ui/Button";
import If from "~/core/ui/If";
import Modal from "~/core/ui/Modal";
import Spinner from "~/core/ui/Spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/core/ui/Tooltip";
import CreateProjectForm from "./CreateProjectForm";
import ProjectsList from "./ProjectsList";

// hooks
import { useUserId } from "~/core/hooks/use-user-id";
import { useCurrentOrganization } from "~/lib/organizations/hooks/use-current-organization";
import useIsUserCanCreateDubs from "~/lib/projects/hooks/use-is-user-can-create-dubs";
import useMaxMediaFileDuration from "~/lib/projects/hooks/use-max-media-file-duration";
import useRequirementsInfoTooltipText from "~/lib/projects/hooks/use-requirements-info-tooltip-text";

// constants
import { MAX_FILE_DURATION_STRING_TEMPLATE } from "~/lib/projects/limits";

// icons
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const ProjectsWrapper = () => {
  const userId = useUserId();
  const userOrganization = useCurrentOrganization();
  const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState<boolean>(false);

  const handleOpenCreateProjectModal = () => {
    setCreateProjectModalOpen(true);
  };

  const handleCloseCreateProjectModal = () => {
    setCreateProjectModalOpen(false);
  };

  // User's organization constains used tokens
  // If no info about tokens => user cannot create project
  // So we need wait until user org will loaded
  if (userId === undefined || userOrganization === undefined) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className={"flex flex-col space-y-6 pb-36"}>
        <ProjectsWrapperHeader handleOpenCreateProjectModal={handleOpenCreateProjectModal} />
        <ProjectsList userId={userId} />
      </div>

      <Modal
        heading={<CreateProjectModalHeading />}
        isOpen={isCreateProjectModalOpen}
        setIsOpen={setCreateProjectModalOpen}
      >
        <CreateProjectForm
          userId={userId}
          organizationId={userOrganization.id}
          handleClose={handleCloseCreateProjectModal}
        />
      </Modal>
    </>
  );
};

export default ProjectsWrapper;

interface ProjectsWrapperHeaderProps {
  handleOpenCreateProjectModal: () => void;
}

const ProjectsWrapperHeader: FC<ProjectsWrapperHeaderProps> = (props) => {
  const { handleOpenCreateProjectModal } = props;

  const { isUserCanCreateNewDubs, fetchProjectsCountStatus } = useIsUserCanCreateDubs();

  return (
    <>
      {isUserCanCreateNewDubs ? (
        <Button className="w-full" onClick={handleOpenCreateProjectModal}>
          Create Project
        </Button>
      ) : (
        <FreePlanExceededAlert />
      )}
    </>
  );
};

const FreePlanExceededAlert = () => (
  <Alert type="warn">
    <AlertHeading>You exceeded your free plan</AlertHeading>

    <div>
      <p className="mb-3 mt-2">Please upgrade your plan to continue creating new projects.</p>
      <Button href="/settings/subscription">Upgrade plan</Button>
    </div>
  </Alert>
);

const CreateProjectModalHeading = () => {
  const { isInfoTooltipEnabled, infoTooltipTexts } = useRequirementsInfoTooltipText();
  const MAX_MEDIA_FILE_DURATION = useMaxMediaFileDuration();

  if (!infoTooltipTexts) {
    return <span>New Project</span>;
  }

  //* Supported Languages
  const supportedLanguagesSection = infoTooltipTexts.supported_languages;

  // For source file
  const forSourceFile = supportedLanguagesSection.for_source_file;
  const sourceFileSupportedLanguages = forSourceFile.languages_list.join(", ");

  // For export file
  const forExportFile = supportedLanguagesSection.for_export_file;
  const exportFileSupportedLanguages = forExportFile.languages_list.join(", ");

  //* Recommendations
  const recommendationsSection = infoTooltipTexts.recommendations;
  const recommededPointsList = recommendationsSection.recommendations_list.map(
    (recommededPoint) => {
      if (recommededPoint.includes(MAX_FILE_DURATION_STRING_TEMPLATE)) {
        return recommededPoint.replace(
          MAX_FILE_DURATION_STRING_TEMPLATE,
          MAX_MEDIA_FILE_DURATION.inMinutes.toString(),
        );
      }
      return recommededPoint;
    },
  );

  return (
    <div className="flex items-center gap-2">
      <span>New Project</span>
      {/* Requirements list */}
      <If condition={isInfoTooltipEnabled}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <InformationCircleIcon className="h-6" color="gray" />
            </span>
          </TooltipTrigger>

          <TooltipContent>
            <div className="flex flex-col gap-3">
              {/* Supported Languages */}
              <div className="flex flex-col">
                <span>{supportedLanguagesSection.title}:</span>
                <span>{`- ${forSourceFile.title}: ${sourceFileSupportedLanguages}`}</span>
                <span>{`- ${forExportFile.title}: ${exportFileSupportedLanguages}`}</span>
              </div>

              {/* Recommendations */}
              <div className="flex flex-col">
                <span>{recommendationsSection.title}:</span>
                {recommededPointsList.map((recommendedPoint) => (
                  <span key={recommendedPoint}>- {recommendedPoint}</span>
                ))}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </If>
    </div>
  );
};
