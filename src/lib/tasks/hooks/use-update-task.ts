import { useCallback } from 'react';
import { useFirestore } from 'reactfire';
import { doc, updateDoc } from 'firebase/firestore';
import { Task } from '~/lib/tasks/types/task';

function useUpdateTask(taskId: string) {
  const firestore = useFirestore();
  const tasksCollection = 'tasks';

  const docRef = doc(firestore, tasksCollection, taskId);

  return useCallback(
    (task: Partial<Task>) => {
      return updateDoc(docRef, task);
    },
    [docRef]
  );
}

export default useUpdateTask;
