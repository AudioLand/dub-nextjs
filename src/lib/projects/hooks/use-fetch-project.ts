import { useFirestore, useFirestoreDocData } from "reactfire";
import { PROJECTS_COLLECTION } from "~/lib/firestore-collections";
import { doc } from "firebase/firestore";

const useFetchProject = (projectId: string) => {
	const firestore = useFirestore();

	const ref = doc(firestore, PROJECTS_COLLECTION, projectId);

	return useFirestoreDocData(ref, { idField: "id" });
};

export default useFetchProject;
