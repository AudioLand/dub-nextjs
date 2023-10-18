import { GetServerSidePropsContext } from 'next';
import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';
import CreateTaskForm from '~/components/tasks/CreateTaskForm';

const NewTaskPage = () => {
  return (
    <RouteShell title={'New Task'}>
      <div
        className={'max-w-2xl border border-gray-50 p-8 dark:border-black-400'}
      >
        <CreateTaskForm />
      </div>
    </RouteShell>
  );
};

export default NewTaskPage;

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
) {
  return await withAppProps(ctx);
}
