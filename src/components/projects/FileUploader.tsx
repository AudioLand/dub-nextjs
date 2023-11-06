// react
import { ChangeEvent, Dispatch, DragEvent, FC, SetStateAction, useRef } from "react";

// hooks
import useMaxMediaFileDuration from "~/lib/projects/hooks/use-max-media-file-duration";

// constants
import { ACCEPTED_FILES } from "~/lib/projects/limits";

// icons
import { ArrowUpTrayIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import configuration from "~/configuration";
import { useCurrentOrganization } from "~/lib/organizations/hooks/use-current-organization";

const ICON_IN_DROPZONE_SIZE = 48;

interface FileUploaderProps {
  file: File | undefined;
  handleUploadFile: (file: File) => void;
  setFileErrorMessage: Dispatch<SetStateAction<string>>;
}

const FileUploader: FC<FileUploaderProps> = (props) => {
  const { file, handleUploadFile, setFileErrorMessage } = props;
  const filesInputRef = useRef<HTMLInputElement>(null);
  const isFileExists = file !== undefined;

  const MAX_MEDIA_FILE_DURATION = useMaxMediaFileDuration();
  // TODO start: add hook for these functions
  const userOrganization = useCurrentOrganization()!;
  const subscriptionProductId = userOrganization.subscription?.product;
  const subscriptionProduct = configuration.stripe.products.find(
    (product) => product.id === subscriptionProductId,
  )!;
  // TODO end

  const tryToSaveFile = (uploadedFile: File | null) => {
    setFileErrorMessage("");

    if (uploadedFile) {
      const objectUrl = URL.createObjectURL(uploadedFile);
      const audio = new Audio(objectUrl);

      audio.addEventListener("loadedmetadata", () => {
        const fileDuration = audio.duration;

        const isFileDurationValid = fileDuration <= MAX_MEDIA_FILE_DURATION.inSeconds;

        if (isFileDurationValid) {
          const subscriptionTokensInSeconds = subscriptionProduct.tokens! * 60;
          const userAvailableTokensCount =
            subscriptionTokensInSeconds - userOrganization.usedTokensInSeconds;
          const isUserHasEnoughTokens = userAvailableTokensCount - fileDuration >= 0;

          if (isUserHasEnoughTokens) {
            const isFileTypeAccepted = ACCEPTED_FILES.includes(uploadedFile.type);
            if (isFileTypeAccepted) {
              handleUploadFile(uploadedFile);
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
