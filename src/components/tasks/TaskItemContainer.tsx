import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';
import Alert from '~/core/ui/Alert';
import Heading from '~/core/ui/Heading';
import useTimeAgo from '~/lib/tasks/hooks/use-time-ago';
import useFetchTask from '~/lib/tasks/hooks/use-fetch-task';

const TaskItemContainer: React.FC<{
  taskId: string;
}> = ({ taskId }) => {
  const getTimeAgo = useTimeAgo();
  const { data: task, status } = useFetchTask(taskId);

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

  return (
    <div>
      <div className={'flex flex-1 flex-col space-y-0.5'}>
        <Heading type={5}>
          {task.name}
        </Heading>

        <div>
          <p className={'text-xs text-gray-400 dark:text-gray-500'}>
            Due {getTimeAgo(new Date(task.dueDate))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskItemContainer;
