// react
import { useFirestore, useFirestoreCollectionData } from "reactfire";

// firebase
import { collection, query, where } from "firebase/firestore";

// constants
import { PROJECTS_COLLECTION } from "~/lib/firestore-collections";

// types

const useFetchProjectsCount = (userId: string) => {
  const firestore = useFirestore();
  const projectsCollectionRef = collection(firestore, PROJECTS_COLLECTION);

  const constraint = where("userId", "==", userId);
  const projectsCountQuery = query(projectsCollectionRef, constraint);
  const { data: projects, status } = useFirestoreCollectionData(projectsCountQuery);

  return {
    userProjectsCount: projects?.length || 0,
    status: status,
  };
};

export default useFetchProjectsCount;
