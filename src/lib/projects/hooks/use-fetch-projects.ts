// react
import { useFirestore, useFirestoreCollectionData } from "reactfire";

// firebase
import { CollectionReference, collection, query, where } from "firebase/firestore";

// constants
import { PROJECTS_COLLECTION } from "~/lib/firestore-collections";

// types
import { Project } from "../types/project";

const useFetchProjects = (userId: string) => {
  const firestore = useFirestore();

  const collectionRef = collection(firestore, PROJECTS_COLLECTION) as CollectionReference<
    WithId<Project>
  >;

  const constraint = where("userId", "==", userId);
  const projectsQuery = query<WithId<Project>>(collectionRef, constraint);

  return useFirestoreCollectionData<WithId<Project>>(projectsQuery, {
    idField: "id",
  });
};

export default useFetchProjects;
