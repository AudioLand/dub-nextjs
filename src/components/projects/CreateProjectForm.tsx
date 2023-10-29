// react
import { ChangeEvent, FC, useState } from "react";

// ui-components
import Button from "~/core/ui/Button";
import Modal from "~/core/ui/Modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/core/ui/Select";
import TextField from "~/core/ui/TextField";
import FileUploader from "./FileUploader";

// hooks
import { useUserId } from "~/core/hooks/use-user-id";
import useCurrentOrganizationSubscriptionItemId from "~/lib/organizations/hooks/use-current-organization-subscription-item-id";
import useCreateProject from "~/lib/projects/hooks/use-create-project";
import useTargetLanguages from "~/lib/projects/hooks/use-target-languages";
import useUpdateProject from "~/lib/projects/hooks/use-update-project";
import useUploadFileToStorage from "~/lib/projects/hooks/use-upload-file-to-storage";

// constants
import PIPELINE_URL from "~/core/ml-pipeline/url";

// types
import { Timestamp } from "firebase/firestore";
import PROJECT_STATUSES from "~/lib/projects/statuses";
import { Project } from "~/lib/projects/types/project";

interface CreateProjectFormProps {
  handleClose: () => void;
}

const CreateProjectForm: FC<CreateProjectFormProps> = (props) => {
  const { handleClose } = props;

  const userId = useUserId()!;
  const subscriptionItemId = useCurrentOrganizationSubscriptionItemId();
  const targetLanguages = useTargetLanguages();
  const createNewProject = useCreateProject();
  const uploadFileToStorage = useUploadFileToStorage();
  const updateProject = useUpdateProject();

  const [newProject, setNewProject] = useState<Project>({
    name: "",
    targetLanguage: "",
  } as Project);
  //* userMediaFile - is user media file, ready to use in AI
  const [userMediaFile, setUserMediaFile] = useState<File>();
  const [languageErrorMessage, setLanguageErrorMessage] = useState<string>("");
  const [fileErrorMessage, setFileErrorMessage] = useState<string>("");

  const handleNameUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setNewProject((prevProject) => ({
      ...prevProject,
      name: name,
    }));
  };

  const handleLanguageUpdate = (language: string) => {
    setLanguageErrorMessage("");

    setNewProject((prevProject) => ({
      ...prevProject,
      targetLanguage: language,
    }));
  };

  const handleUploadFile = (file: File) => {
    setFileErrorMessage("");
    setUserMediaFile(file);
  };

  const isFormValid = () => {
    const isTargetLanguageSelected = newProject.targetLanguage.length > 0;
    const isMediaFileExists = userMediaFile !== undefined;

    if (!isTargetLanguageSelected) {
      setLanguageErrorMessage("Please select a target language");
      return false;
    }
    if (!isMediaFileExists) {
      setFileErrorMessage("Please upload your media");
      return false;
    }

    return true;
  };

  const handleCreate = async () => {
    if (!isFormValid()) {
      return;
    }
    handleClose();

    const projectNameIsEmpty = newProject.name.trim() === "";

    //* Create new project
    let createdProject;
    try {
      createdProject = await createNewProject({
        ...newProject,
        name: projectNameIsEmpty ? "Untitled" : newProject.name,
        userId: userId,
        status: PROJECT_STATUSES.uploading,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error("Failed to create new project", error);
      return;
    }

    //* Upload file to google cloud storage
    let publicUrl, filePathInBucket;
    try {
      const data = await uploadFileToStorage(userMediaFile!, userId, createdProject.id);
      publicUrl = data.publicUrl;
      filePathInBucket = data.filePathInBucket;
    } catch (error) {
      console.error("Failed to upload file to storage", error);
      await updateProject({
        ...createdProject,
        status: PROJECT_STATUSES.uploadingError,
      });
      return;
    }

    //* Update project status and file link
    try {
      await updateProject({
        ...createdProject,
        status: PROJECT_STATUSES.uploaded,
        originalFileLink: publicUrl,
      });
    } catch (error) {
      console.error("Failed to update project", error);
      return;
    }

    //* Trigger ML pipeline URL to start work
    try {
      const requestParams = new URLSearchParams({
        project_id: createdProject.id,
        target_language: createdProject.targetLanguage,
        original_file_location: filePathInBucket,
      });

      if (subscriptionItemId) {
        requestParams.append("subscription_item_id", subscriptionItemId);
      }

      const url = `${PIPELINE_URL}/?${requestParams.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Failed to trigger ML pipeline", error);
      return;
    }
  };

  return (
    <div className={"flex flex-col space-y-4"}>
      {/* Project Name Input */}
      <TextField>
        <TextField.Label>Project Name</TextField.Label>
        <TextField.Input
          value={newProject.name}
          type="text"
          placeholder="Untitled"
          onChange={handleNameUpdate}
        />
      </TextField>

      {/* Target Lang Input */}
      <TextField>
        <TextField.Label>Target Language *</TextField.Label>
        <Select onValueChange={handleLanguageUpdate}>
          <SelectTrigger>
            <SelectValue placeholder="Select target language" />
          </SelectTrigger>

          <SelectContent>
            {targetLanguages?.map((language) => (
              <SelectItem
                key={language}
                value={language}
                defaultChecked={newProject.targetLanguage === language}
              >
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <TextField.Error error={languageErrorMessage} />
      </TextField>

      {/* Source media Input */}
      <TextField>
        <TextField.Label>Select a Source *</TextField.Label>
        <FileUploader
          file={userMediaFile}
          handleUploadFile={handleUploadFile}
          setFileErrorMessage={setFileErrorMessage}
        />
        <TextField.Error error={fileErrorMessage} />
      </TextField>

      <div className={"flex justify-end space-x-2"}>
        <Modal.CancelButton onClick={handleClose}>Cancel</Modal.CancelButton>

        <Button onClick={handleCreate}>Create</Button>
      </div>
    </div>
  );
};

export default CreateProjectForm;
