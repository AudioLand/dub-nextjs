import { Task } from '~/lib/tasks/types/task';
import TasksListItem from './TasksListItem';

const TasksList: React.FC<{
  tasks: WithId<Task>[];
}> = ({ tasks }) => {
  return (
    <div>
      {tasks.map(task => <TasksListItem key={task.id} task={task} />)}
    </div>
  );
};

export default TasksList;
