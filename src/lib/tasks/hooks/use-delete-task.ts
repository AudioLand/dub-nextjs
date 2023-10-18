import { useFirestore } from 'reactfire';
import { deleteDoc, doc } from 'firebase/firestore';
import { useCallback } from 'react';

function useDeleteTask(taskId: string) {
  const firestore = useFirestore();
  const collection = `tasks`;
  const task = doc(firestore, collection, taskId);

  return useCallback(() => {
    return deleteDoc(task);
  }, [task]);
}

export default useDeleteTask;
