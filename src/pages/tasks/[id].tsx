import { GetServerSidePropsContext } from 'next';
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';

import { withAppProps } from '~/lib/props/with-app-props';
import TaskItemContainer from '~/components/tasks/TaskItemContainer';

import RouteShell from '~/components/RouteShell';
import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';
import Alert from '~/core/ui/Alert';
import ErrorBoundary from '~/core/ui/ErrorBoundary';

const TaskPage: React.FC<{ taskId: string }> = ({ taskId }) => {
  return (
    <RouteShell title={<TaskPageHeading />}>
      <ErrorBoundary
        fallback={<Alert type={'error'}>Ops, an error occurred :(</Alert>}
      >
        <TaskItemContainer taskId={taskId} />
      </ErrorBoundary>
    </RouteShell>
  );
};

function TaskPageHeading() {
  return (
    <div className={'flex items-center space-x-6'}>
      <Heading type={4}>
        <span>Task</span>
      </Heading>

      <Button size={'small'} color={'transparent'} href={'/tasks'}>
        <ArrowLeftIcon className={'mr-2 h-4'} />
        Back to Tasks
      </Button>
    </div>
  );
}

export default TaskPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const appProps = await withAppProps(ctx);
  const taskId = ctx.query.id;

  if ('props' in appProps) {
    return {
      props: {
        ...(appProps.props ?? {}),
        taskId,
      },
    };
  }

  return appProps;
}
