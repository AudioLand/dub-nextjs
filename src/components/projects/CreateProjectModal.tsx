// react
import { ChangeEvent, FC, useState } from "react";
import { useUser } from "reactfire";

// ui-components
import Button from "~/core/ui/Button";
import Modal from "~/core/ui/Modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/core/ui/Select";
import TextField from "~/core/ui/TextField";
import FileUploader from "./FileUploader";

// hooks
import useTargetLanguages from "~/core/flagsmith/hooks/use-target-languages";
import useCreateProject from "~/lib/projects/hooks/use-create-project";

// types
import { Project } from "~/lib/projects/types/project";

interface CreateProjectModalProps {
  handleClose: () => void;
}

const CreateProjectModal: FC<CreateProjectModalProps> = (props) => {
  const { handleClose } = props;

  const user = useUser();
  const userId = user.data?.uid as string;
  const targetLanguages = useTargetLanguages();
  const createNewProject = useCreateProject();

  const [newProject, setNewProject] = useState<Project>({
    name: "",
  } as Project);
  //* userMediaFile - is user media file, ready to use in AI
  const [userMediaFile, setUserMediaFile] = useState<File>();
  const [languageErrorMessage, setLanguageErrorMessage] = useState<string>("");
  const [fileErrorMessage, setFileErrorMessage] = useState<string>("");

  const handleNameUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const name = (e.currentTarget as HTMLInputElement).value;
    setNewProject((prevProject) => ({
      ...prevProject,
      name: name,
    }));
  };

  const handleLanguageUpdate = (language: string) => {
    setLanguageErrorMessage("");

    setNewProject((prevProject) => ({
      ...prevProject,
      language: language,
    }));
  };

  const handleUploadFile = (file: File) => {
    setFileErrorMessage("");
    setUserMediaFile(file);
  };

  const handleIsValid = () => {
    const isTargetLanguageSelected = newProject.language?.length > 0;
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

  const handleCreate = () => {
    if (handleIsValid()) {
      handleClose();
      createNewProject(newProject);
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
                defaultChecked={newProject.language === language}
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

export default CreateProjectModal;
