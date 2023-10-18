import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';
import Alert from '~/core/ui/Alert';
import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';

import useFetchTasks from '~/lib/tasks/hooks/use-fetch-tasks';
import TasksList from '~/components/tasks/TasksList';

const TasksContainer: React.FC<{
  organizationId: string;
}> = ({ organizationId }) => {
  const { status, data: tasks } = useFetchTasks(organizationId);

  if (status === `loading`) {
    return <PageLoadingIndicator>Loading Tasks...</PageLoadingIndicator>;
  }

  if (status === `error`) {
    return (
      <Alert type={'error'}>
        Sorry, we encountered an error while fetching your tasks.
      </Alert>
    );
  }

  if (tasks.length === 0) {
    return <TasksEmptyState />;
  }

  return (
    <div className={'flex flex-col space-y-4'}>
      <div className={'flex justify-end'}>
        <CreateTaskButton>New Task</CreateTaskButton>
      </div>

      <TasksList tasks={tasks} />
    </div>
  );
};

function TasksEmptyState() {
  return (
    <div
      className={
        'flex flex-col items-center justify-center space-y-4' + ' h-full p-24'
      }
    >
      <div>
        <Heading type={5}>No tasks found</Heading>
      </div>

      <CreateTaskButton>Create your first Task</CreateTaskButton>
    </div>
  );
}

function CreateTaskButton(props: React.PropsWithChildren) {
  return <Button href={'/tasks/new'}>{props.children}</Button>;
}

export default TasksContainer;
