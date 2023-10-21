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
      project.createdAt = Timestamp.fromDate(new Date());
      project.userId = user.data?.uid as string;

      // TODO https://www.notion.so/krenels/Tasks-d60b1499e99443469f95aca9fb86f0b6?p=5fdd168c8d6b489f90a94e1624122d77&pm=s
      // project.status = PROJECT_STATUSES.uploading;
      project.status = PROJECT_STATUSES.translated;
      project.output = 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4';
      project.input = 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3';

      return addDoc(projectsCollection, project);
    },
    [projectsCollection],
  );
};

export default useCreateProject;
