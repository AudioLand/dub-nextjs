// react
import { useCallback } from "react";
import { useFirestore } from "reactfire";

// firebase
import { CollectionReference, addDoc, collection, getDoc } from "firebase/firestore";

// constants
import { PROJECTS_COLLECTION } from "~/lib/firestore-collections";

// types
import { Project } from "../types/project";

const useCreateProject = () => {
  const firestore = useFirestore();
  const projectsCollection = collection(
    firestore,
    PROJECTS_COLLECTION,
  ) as CollectionReference<WithId<Project>>;

  return useCallback(
    async (project: Project) => {
      const projectRef = await addDoc(projectsCollection, project);
      const projectSnap = await getDoc(projectRef);
      const projectData = {
        ...projectSnap.data(),
        id: projectRef.id,
      } as WithId<Project>;
      return projectData;
    },
    [projectsCollection],
  );
};

export default useCreateProject;
