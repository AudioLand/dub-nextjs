import { addDoc, collection } from "firebase/firestore";
import { useCallback } from "react";
import { useFirestore } from "reactfire";
import { PROJECTS_COLLECTION } from "~/lib/firestore-collections";
import { UserProject } from "../types/project";

const useCreateProject = () => {
	const firestore = useFirestore();
	const projectsCollection = collection(firestore, PROJECTS_COLLECTION);

	return useCallback(
		(project: UserProject) => {
			return addDoc(projectsCollection, project);
		},
		[projectsCollection],
	);
};

export default useCreateProject;
