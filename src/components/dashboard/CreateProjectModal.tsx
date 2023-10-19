import { Dispatch, FC, SetStateAction, useState } from "react";
import { useUser } from "reactfire";
import useTargetLanguages from "~/core/flagsmith/hooks/use-target-languages";
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
import useCreateProject from "~/lib/projects/hooks/use-create-project";
import { UserProject } from "~/lib/projects/types/project";
import FileUploader from "./FileUploader";

interface CreateProjectModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateProjectModal: FC<CreateProjectModalProps> = (props) => {
	const { isOpen, setIsOpen } = props;

	const user = useUser();
	const userId = user.data?.uid as string;
	const targetLanguages = useTargetLanguages();
	const createNewProject = useCreateProject();

	//* userMediaFile - is user media file, ready to use in AI
	const [userMediaFile, setUserMediaFile] = useState<File>();
	const [newProject, setNewProject] = useState<UserProject>({} as UserProject);

	const updateNewProject = (key: string, value: string) => {
		setNewProject((prevProject) => ({
			...prevProject!,
			[key]: value,
		}));
	};
	console.log(newProject);

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleCreate = () => {
		createNewProject(newProject!);
	};

	return (
		<Modal heading="Create a Dub" isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className={"flex flex-col space-y-4"}>
				{/* Project Name Input */}
				<TextField>
					<TextField.Label>Project Name</TextField.Label>
					<TextField.Input
						value={newProject.name}
						type="text"
						placeholder="Untitled"
						onInput={(e) => {
							const name = (e.currentTarget as HTMLInputElement).value;
							updateNewProject("name", name);
						}}
					/>
				</TextField>

				{/* Target Lang Input */}
				<TextField>
					<TextField.Label>Target Language *</TextField.Label>
					<Select
						required
						onValueChange={(selectedLanguage) => {
							updateNewProject("language", selectedLanguage);
						}}
					>
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
				</TextField>

				{/* Source media Input */}
				<TextField>
					<TextField.Label>Select a Source *</TextField.Label>
					<FileUploader setFile={setUserMediaFile} />
				</TextField>

				<div className={"flex justify-end space-x-2"}>
					<Modal.CancelButton onClick={handleClose}>Cancel</Modal.CancelButton>

					<Button onClick={handleCreate}>Create</Button>
				</div>
			</div>
		</Modal>
	);
};

export default CreateProjectModal;
