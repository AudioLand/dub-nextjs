// react
import { useCallback } from "react";
import { useFirestore } from "reactfire";

// firebase
import { DocumentReference, doc, updateDoc } from "firebase/firestore";

// constants
import { PROJECTS_COLLECTION } from "~/lib/firestore-collections";

// types
import { Project } from "../types/project";

const useUpdateProject = () => {
  const firestore = useFirestore();

  return useCallback(
    async (project: WithId<Project>) => {
      const projectRef = doc(
        firestore,
        PROJECTS_COLLECTION,
        project.id,
      ) as DocumentReference<WithId<Project>>;

      await updateDoc(projectRef, project);
    },
    [firestore],
  );
};

export default useUpdateProject;
