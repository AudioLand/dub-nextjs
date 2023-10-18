import { useFirestore } from 'reactfire';
import { useCallback } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { Task } from '~/lib/tasks/types/task';

function useCreateTask() {
  const firestore = useFirestore();
  const tasksCollection = collection(firestore, `/tasks`);

  return useCallback(
    (task: Task) => {
      return addDoc(tasksCollection, task);
    },
    [tasksCollection]
  );
}

export default useCreateTask;
