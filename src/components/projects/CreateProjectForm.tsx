// react
import { ChangeEvent, FC, useMemo, useRef, useState } from "react";

// ui-components
import Badge from "~/core/ui/Badge";
import Button from "~/core/ui/Button";
import IconButton from "~/core/ui/IconButton";
import If from "~/core/ui/If";
import Modal from "~/core/ui/Modal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/core/ui/Select";
import TextField from "~/core/ui/TextField";
import FileUploader from "./FileUploader";

// hooks
import { useUserSession } from "~/core/hooks/use-user-session";
import useCreateProject from "~/lib/projects/hooks/use-create-project";
import useTargetLanguages from "~/lib/projects/hooks/use-target-languages";
import useUpdateProject from "~/lib/projects/hooks/use-update-project";
import useUploadFileToStorage from "~/lib/projects/hooks/use-upload-file-to-storage";
import useVideoFileDuration from "~/lib/projects/hooks/use-video-file-duration";
import { estimateProjectDuration } from "~/lib/projects/video";

// constants
import { OUR_PIPELINE_URL, RASK_PIPELINE_URL } from "~/core/ml-pipeline/url";
import { PREVIEW_HOST_URL } from "~/lib/projects/languages-and-voices-config";
import { filterVoicesByLanguage } from "~/lib/projects/voices";
import { SPEAKERS_COUNT_LIST } from "~/lib/projects/speakers";

// types
import { Timestamp } from "firebase/firestore";
import PROJECT_STATUSES from "~/lib/projects/statuses";
import { Project } from "~/lib/projects/types/project";

// icons
import { PlayIcon } from "@heroicons/react/24/outline";

interface CreateProjectFormProps {
  handleClose: () => void;
  userId: string;
  organizationId: string;
  shouldUseRaskAPI: boolean;
}

const CreateProjectForm: FC<CreateProjectFormProps> = (props) => {
  const { handleClose, userId, organizationId, shouldUseRaskAPI } = props;

  const audioRef = useRef<HTMLAudioElement>(null);

  const createNewProject = useCreateProject();
  const uploadFileToStorage = useUploadFileToStorage();
  const updateProject = useUpdateProject();
  const user = useUserSession();
  const userEmail = user?.auth?.email!;

  const [newProject, setNewProject] = useState<Project>({
    name: "",
    targetLanguage: "",
  } as Project);

  const [tokensForProject, setTokensForProject] = useState<number>(0);

  //* userMediaFile - is user media file, ready to use in AI
  const [userMediaFile, setUserMediaFile] = useState<File>();
  const duration = useVideoFileDuration(userMediaFile);
  const projectDuration = useMemo(
    () => duration && formatTime(estimateProjectDuration(duration)),
    [duration],
  );

  function formatTime(seconds: number) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return min + " minutes, " + (sec < 10 ? "0" : "") + sec + " seconds";
  }

  const [languageErrorMessage, setLanguageErrorMessage] = useState<string>("");
  const [fileErrorMessage, setFileErrorMessage] = useState<string>("");

  const targetLanguages = useTargetLanguages();
  const availableVoices = filterVoicesByLanguage(newProject.targetLanguage);
  const isLanguageSelected = availableVoices.length === 0;

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

  const handleVoiceUpdate = (voiceId: string) => {
    setNewProject((prevProject) => ({
      ...prevProject,
      targetVoice: Number(voiceId),
    }));
  };

  const handleUploadFile = (file: File) => {
    setFileErrorMessage("");
    setUserMediaFile(file);
  };

  const handleSpeakersUpdate = (numberOfSpeakers: string) => {
    setNewProject((prevProject) => ({
      ...prevProject,
      numberOfSpeakers: numberOfSpeakers,
    }));
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
        voice_id: createdProject.targetVoice.toString(),
        user_email: userEmail,
      });

      const pipelineUrl = shouldUseRaskAPI ? RASK_PIPELINE_URL : OUR_PIPELINE_URL;

      if (shouldUseRaskAPI) {
        requestParams.append("used_tokens_in_seconds", tokensForProject.toString());

        if (createdProject.numberOfSpeakers !== "Autodetect") {
          requestParams.append("number_of_speakers", createdProject.numberOfSpeakers);
        }
      }

      const url = `${pipelineUrl}/?${requestParams.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Failed to trigger ML pipeline", error);
      return;
    }
  };

  const handlePlayPreviewAudio = (sampleAudioUrl: string) => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.src = `${PREVIEW_HOST_URL}/${sampleAudioUrl}`;
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
                <If condition={isLanguageSelected}>
                  <span className="px-1">Select any language to see avaliable voices</span>
                </If>

                {availableVoices?.map(({ voice_id, voice_name, provider, sample }) => (
                  <div key={voice_id} className="flex items-center">
                    <IconButton
                      className="pl-1 hover:border-0 focus:border-0"
                      onClick={() => handlePlayPreviewAudio(sample)}
                    >
                      <PlayIcon className="h-5" />
                    </IconButton>

                    <SelectItem
                      className="px-2"
                      value={voice_id.toString()}
                      defaultChecked={newProject.targetVoice === voice_id}
                      showSelectedIcon={false}
                    >
                      <div className="flex w-full items-center gap-5">
                        <span>{voice_name}</span>
                        <If condition={provider === "eleven_labs"}>
                          <Badge
                            size="verySmall"
                            style={{
                              fontSize: 9,
                            }}
                          >
                            Powered by IIElevenLabs
                          </Badge>
                        </If>
                      </div>
                    </SelectItem>
                  </div>
                ))}
              </SelectGroup>

              <audio ref={audioRef} hidden />
            </SelectContent>
          </Select>
        </TextField>
      </div>

      {/* Number of Speakers Select */}
      <TextField>
        <TextField.Label>Number of Speakers</TextField.Label>
        <Select name="numberOfSpeakers" onValueChange={handleSpeakersUpdate}>
          <SelectTrigger>
            <SelectValue placeholder="Autodetect" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {SPEAKERS_COUNT_LIST.map((i) => (
                <SelectItem key={i} value={i}>
                  {i}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </TextField>

      {/* Source media Input */}
      <TextField>
        <TextField.Label>Select a Source *</TextField.Label>
        <FileUploader
          file={userMediaFile}
          handleUploadFile={handleUploadFile}
          setFileErrorMessage={setFileErrorMessage}
          setTokensForProject={setTokensForProject}
        />
        <TextField.Error error={fileErrorMessage} />
      </TextField>

      <If condition={projectDuration}>
        <p className="flex space-x-4">
          <span className="text-gray-500 dark:text-gray-400">Estimated time:</span>
          <span>{projectDuration}</span>
        </p>
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
