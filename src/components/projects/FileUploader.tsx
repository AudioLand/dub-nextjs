// react
import { ChangeEvent, Dispatch, DragEvent, FC, SetStateAction, useRef } from "react";

// icons
import { ArrowUpTrayIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";

interface FileUploaderProps {
  file: File | undefined;
  handleUploadFile: (file: File) => void;
  setFileErrorMessage: Dispatch<SetStateAction<string>>;
}

const FileUploader: FC<FileUploaderProps> = (props) => {
  const { file, handleUploadFile, setFileErrorMessage } = props;
  const filesInputRef = useRef<HTMLInputElement>(null);
  const isFileExists = file !== undefined;
  const ICON_IN_DROPZONE_SIZE = 48;
  const ACCEPTED_FILES = [
    "audio/aac",
    "audio/x-aac",
    "audio/x-aiff",
    "audio/ogg",
    "audio/mpeg",
    "audio/mp3",
    "audio/mpeg3",
    "audio/x-mpeg-3",
    "audio/opus",
    "audio/wav",
    "audio/x-wav",
    "audio/webm",
    "audio/flac",
    "audio/x-flac",
    "audio/mp4",
    "video/mp4",
    "video/x-msvideo",
    "video/x-matroska",
    "video/quicktime",
    "video/x-ms-wmv",
    "video/x-flv",
    "video/webm",
    "video/mpeg",
    "video/3gpp",
  ];

  const handleDropzoneClick = () => {
    filesInputRef.current?.click();
  };

  const handleDroppedFiles = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileErrorMessage("");
    const file = e.dataTransfer.files[0];
    const isFileTypeAccepted = ACCEPTED_FILES.includes(file.type);
    if (isFileTypeAccepted) {
      handleUploadFile(file);
    } else {
      setFileErrorMessage("Wrong file type. Upload audio or video file");
    }
  };

  const handleDropOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    handleUploadFile(file);
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
