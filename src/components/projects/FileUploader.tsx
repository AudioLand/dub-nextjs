// react
import { ChangeEvent, Dispatch, DragEvent, FC, SetStateAction, useRef } from "react";

// hooks
import useMaxMediaFileDuration from "~/lib/projects/hooks/use-max-media-file-duration";

// constants
import { ACCEPTED_FILES } from "~/lib/projects/limits";

// icons
import { ArrowUpTrayIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import useUserTokens from "~/lib/user/hooks/use-user-tokens";

const ICON_IN_DROPZONE_SIZE = 48;

interface FileUploaderProps {
  file: File | undefined;
  handleUploadFile: (file: File) => void;
  setFileErrorMessage: Dispatch<SetStateAction<string>>;
  setTokensForProject: Dispatch<SetStateAction<number>>;
}

const FileUploader: FC<FileUploaderProps> = (props) => {
  const { file, handleUploadFile, setFileErrorMessage, setTokensForProject } = props;
  const filesInputRef = useRef<HTMLInputElement>(null);
  const isFileExists = file !== undefined;

  const MAX_MEDIA_FILE_DURATION = useMaxMediaFileDuration();
  const { usedTokens, availableTokensInSubscription } = useUserTokens();

  const tryToSaveFile = (uploadedFile: File | null) => {
    setFileErrorMessage("");

    if (uploadedFile) {
      const objectUrl = URL.createObjectURL(uploadedFile);
      const audio = new Audio(objectUrl);

      audio.addEventListener("loadedmetadata", () => {
        const fileDuration = {
          inSeconds: audio.duration,
          roundedInMinutes: Math.floor(audio.duration / 60),
        };
        const isFileDurationValid = fileDuration.inSeconds <= MAX_MEDIA_FILE_DURATION.inSeconds;

        if (isFileDurationValid) {
          const isUserHasEnoughTokens =
            availableTokensInSubscription.inMinutes >
            usedTokens.roundedInMinutes + fileDuration.roundedInMinutes;

          if (isUserHasEnoughTokens) {
            const isFileTypeAccepted = ACCEPTED_FILES.includes(uploadedFile.type);
            if (isFileTypeAccepted) {
              handleUploadFile(uploadedFile);
              
              const tokensInSeconds = Math.floor(fileDuration.inSeconds)
              setTokensForProject(tokensInSeconds);
            } else {
              setFileErrorMessage("Wrong file type. Please, upload audio or video file");
            }
          } else {
            setFileErrorMessage(`You don't have enough tokens for this file`);
          }
        } else {
          setFileErrorMessage(
            `Too long file. Please, upload a file with a duration of no more than ${MAX_MEDIA_FILE_DURATION.inMinutes} minutes`,
          );
        }
        URL.revokeObjectURL(objectUrl);
      });
    } else {
      setFileErrorMessage("No file was uploaded.");
    }
  };

  const handleDropzoneClick = () => {
    filesInputRef.current?.click();
  };

  const handleDropOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDroppedFiles = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    tryToSaveFile(file);
  };

  const handleUploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const filesList = e.target.files;
    if (filesList) {
      tryToSaveFile(filesList.item(0));
    }
  };

  return (
    <>
      <div
        className="flex flex-col py-10 gap-2"
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderStyle: "dashed",
          borderWidth: 2,
          borderColor: "#fff",
          borderRadius: 15,
        }}
        onClick={handleDropzoneClick}
        onDrop={handleDroppedFiles}
        onDragOver={handleDropOver}
      >
        {isFileExists ? (
          <>
            <DocumentCheckIcon height={ICON_IN_DROPZONE_SIZE} />
            <span>{file?.name}</span>
          </>
        ) : (
          <>
            <ArrowUpTrayIcon height={ICON_IN_DROPZONE_SIZE} />
            <span>Click to upload your media file</span>
            <span>or drop it here</span>
          </>
        )}
      </div>

      <input
        ref={filesInputRef}
        type="file"
        multiple={false}
        hidden
        onChange={handleUploadFiles}
        accept={ACCEPTED_FILES.join(",")}
      />
    </>
  );
};

export default FileUploader;
