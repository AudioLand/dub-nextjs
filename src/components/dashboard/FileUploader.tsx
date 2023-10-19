import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, Dispatch, DragEvent, FC, SetStateAction, useRef } from "react";

interface FileUploaderProps {
	setFile: Dispatch<SetStateAction<File | undefined>>;
}

const FileUploader: FC<FileUploaderProps> = (props) => {
	const { setFile } = props;
	const filesInputRef = useRef<HTMLInputElement>(null);

	const handleDropzoneClick = () => {
		filesInputRef.current?.click();
	};

	const handleDroppedFiles = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		setFile(file);
	};

	const handleDropOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleUploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		setFile(file);
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
				<ArrowUpTrayIcon height={48} />
				<span>Upload your media</span>
			</div>

			<input
				ref={filesInputRef}
				type="file"
				multiple={false}
				hidden
				onChange={handleUploadFiles}
			/>
		</>
	);
};

export default FileUploader;
