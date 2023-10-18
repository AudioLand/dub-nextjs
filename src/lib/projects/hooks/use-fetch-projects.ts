import {
	CollectionReference,
	collection,
	query,
	where,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { PROJECTS_COLLECTION } from "~/lib/firestore-collections";
import { UserProject } from "../types/project";

const useFetchProjects = (userId: string) => {
	const firestore = useFirestore();

	const collectionRef = collection(
		firestore,
		PROJECTS_COLLECTION,
	) as CollectionReference<UserProject>;

	const constraint = where("userId", "==", userId);
	const organizationsQuery = query<UserProject>(collectionRef, constraint);

	return useFirestoreCollectionData<UserProject>(organizationsQuery, {
		idField: "id",
	});
};

export default useFetchProjects;
