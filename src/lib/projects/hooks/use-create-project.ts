// react
import { useCallback } from "react";
import { useUser, useFirestore } from "reactfire";

// firebase
import { addDoc, collection, Timestamp } from "firebase/firestore";

// constants
import { PROJECTS_COLLECTION } from "~/lib/firestore-collections";
import PROJECT_STATUSES from "../statuses";

// types
import { Project } from "../types/project";

const useCreateProject = () => {
  const firestore = useFirestore();
  const user = useUser();
  const projectsCollection = collection(firestore, PROJECTS_COLLECTION);

  return useCallback(
    (project: Project) => {
      const projectNameIsEmpty = project.name.trim() === "";
      if (projectNameIsEmpty) project.name = "Untitled";
      project.status = PROJECT_STATUSES.uploading;
      project.createdAt = Timestamp.fromDate(new Date());
      project.userId = user.data?.uid as string;

      return addDoc(projectsCollection, project);
    },
    [projectsCollection],
  );
};

export default useCreateProject;
