// react
import { ChangeEvent, FC, useRef, useState } from "react";

// ui-components
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import Button from "~/core/ui/Button";
import IconButton from "~/core/ui/IconButton";
import If from "~/core/ui/If";
import Modal from "~/core/ui/Modal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/core/ui/Select";
import TextField from "~/core/ui/TextField";
import FileUploader from "./FileUploader";

// hooks
import useCollapsible from "~/core/hooks/use-sidebar-state";
import useCreateProject from "~/lib/projects/hooks/use-create-project";
import useMaxMediaFileDuration from "~/lib/projects/hooks/use-max-media-file-duration";
import useRequirementsInfoTooltipText from "~/lib/projects/hooks/use-requirements-info-tooltip-text";
import useTargetLanguages from "~/lib/projects/hooks/use-target-languages";
import useTargetVoices from "~/lib/projects/hooks/use-target-voices";
import useUpdateProject from "~/lib/projects/hooks/use-update-project";
import useUploadFileToStorage from "~/lib/projects/hooks/use-upload-file-to-storage";

// constants
import PIPELINE_URL from "~/core/ml-pipeline/url";
import { MAX_FILE_DURATION_STRING_TEMPLATE } from "~/lib/projects/limits";

// types
import { Timestamp } from "firebase/firestore";
import PROJECT_STATUSES from "~/lib/projects/statuses";
import { Project } from "~/lib/projects/types/project";

// icons
import { ChevronDownIcon, PlayIcon } from "@heroicons/react/24/outline";

interface CreateProjectFormProps {
  handleClose: () => void;
  userId: string;
  organizationId: string;
}

const CreateProjectForm: FC<CreateProjectFormProps> = (props) => {
  const { handleClose, userId, organizationId } = props;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isCollapsed, setCollapsed] = useCollapsible();

  const targetLanguages = useTargetLanguages();
  const { targetVoices } = useTargetVoices();

  const createNewProject = useCreateProject();
  const uploadFileToStorage = useUploadFileToStorage();
  const updateProject = useUpdateProject();

  const { isInfoTooltipEnabled, infoTooltipTexts } = useRequirementsInfoTooltipText();
  const MAX_MEDIA_FILE_DURATION = useMaxMediaFileDuration();

  //* Recommendations
  const recommendations = infoTooltipTexts.recommendations;
  const recommededPointsList = recommendations.recommedations_list.map((recommededPoint) => {
    if (recommededPoint.includes(MAX_FILE_DURATION_STRING_TEMPLATE)) {
      return recommededPoint.replace(
        MAX_FILE_DURATION_STRING_TEMPLATE,
        MAX_MEDIA_FILE_DURATION.inMinutes.toString(),
      );
    }
    return recommededPoint;
  });

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

  const handleVoiceUpdate = (voice: string) => {
    setNewProject((prevProject) => ({
      ...prevProject,
      targetVoice: voice,
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
        organization_id: organizationId,
        voice_id: createdProject.targetVoice,
      });

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

  const handleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  const handlePlayPreviewAudio = (audioUrl: string) => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.src = audioUrl;
    audioRef.current.play();
  };

  return (
    // TODO: use form tag, without onChange events
    // Notion task: https://www.notion.so/krenels/onChange-5524544683f34f9f8b009daa959f03a6?pvs=4
    <div className={"flex flex-col space-y-4"}>
      {/* Project Name Input */}
      <TextField>
        <TextField.Label>Project Name</TextField.Label>
        <TextField.Input
          value={newProject.name}
          type="text"
          placeholder="Untitled"
          name="name"
          onChange={handleNameUpdate}
        />
      </TextField>

      <div className="grid grid-cols-2 gap-5">
        {/* Target Language Select */}
        <TextField>
          <TextField.Label>Target Language *</TextField.Label>
          <Select name="targetLanguage" onValueChange={handleLanguageUpdate}>
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

        {/* Target Voice Select */}
        <TextField>
          <TextField.Label>Target Voice</TextField.Label>
          <Select name="targetVoice" onValueChange={handleVoiceUpdate}>
            <SelectTrigger>
              <SelectValue placeholder="Select target voice" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Powered with 11labs</SelectLabel>
                {targetVoices?.map(({ voice_id, name, preview_url }) => (
                  <div key={voice_id} className="flex items-center gap-1">
                    <IconButton
                      className="pl-1 hover:border-0 focus:border-0"
                      onClick={() => handlePlayPreviewAudio(preview_url)}
                    >
                      <PlayIcon className="h-5" />
                    </IconButton>

                    <SelectItem
                      value={voice_id}
                      defaultChecked={newProject.targetVoice === voice_id}
                      showSelectedIcon={false}
                    >
                      {name}
                    </SelectItem>
                  </div>
                ))}
              </SelectGroup>

              <audio ref={audioRef} hidden />
            </SelectContent>
          </Select>
        </TextField>
      </div>

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

      {/* Requirements list */}
      <If condition={isInfoTooltipEnabled}>
        <Collapsible className="w-full pt-3 text-gray-500" onClick={handleCollapse}>
          <CollapsibleTrigger className="w-full">
            <div className="flex w-full justify-between items-center">
              <span className="font-semibold">{recommendations.title}</span>
              <ChevronDownIcon
                className={`h-6 w-6 text-gray-500 rotate-${isCollapsed ? 180 : 0}`}
              />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div>
              {recommededPointsList.map((recommendedPoint) => (
                <div key={recommendedPoint}>- {recommendedPoint}</div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </If>

      {/* Buttons */}
      <div className={"flex justify-end space-x-2"}>
        <Modal.CancelButton onClick={handleClose}>Cancel</Modal.CancelButton>

        <Button onClick={handleCreate}>Create</Button>
      </div>
    </div>
  );
};

export default CreateProjectForm;
