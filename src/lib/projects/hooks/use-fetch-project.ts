// react
import { useFirestore, useFirestoreDocData } from "reactfire";

// firebase
import { DocumentReference, doc } from "firebase/firestore";

// constants
import { PROJECTS_COLLECTION } from "~/lib/firestore-collections";

// types
import { Project } from "../types/project";

const useFetchProject = (projectId: string) => {
  const firestore = useFirestore();

  const ref = doc(firestore, PROJECTS_COLLECTION, projectId) as DocumentReference<WithId<Project>>;

  return useFirestoreDocData<WithId<Project>>(ref, { idField: "id" });
};

export default useFetchProject;
