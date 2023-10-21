// react
import { useCallback } from "react";
import { useFirestore } from "reactfire";

// firebase
import { addDoc, collection } from "firebase/firestore";

// constants
import { PROJECTS_COLLECTION } from "~/lib/firestore-collections";

// types
import { Project } from "../types/project";

const useCreateProject = () => {
  const firestore = useFirestore();
  const projectsCollection = collection(firestore, PROJECTS_COLLECTION);

  return useCallback(
    (project: Project) => {
      return addDoc(projectsCollection, project);
    },
    [projectsCollection],
  );
};

export default useCreateProject;
