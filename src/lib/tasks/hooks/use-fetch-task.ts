import { useFirestore, useFirestoreDocData } from 'reactfire';
import { doc } from 'firebase/firestore';

function useFetchTasks(taskId: string) {
  const firestore = useFirestore();
  const tasksCollection = 'tasks';

  const ref = doc(firestore, tasksCollection, taskId);

  return useFirestoreDocData(ref, { idField: 'id' });
}

export default useFetchTasks;
