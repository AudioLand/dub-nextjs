import { useRouter } from 'next/router';
import { FormEventHandler, useCallback } from 'react';
import toaster from 'react-hot-toast';

import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';
import Heading from '~/core/ui/Heading';

import useCreateTask from '~/lib/tasks/hooks/use-create-task';
import { useRequestState } from '~/core/hooks/use-request-state';
import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';

const CreateTaskForm = () => {
  const createTask = useCreateTask();
  const { setLoading, state } = useRequestState();
  const router = useRouter();
  const organization = useCurrentOrganization();
  const organizationId = organization?.id as string;

  const onCreateTask: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      const target = event.currentTarget;
      const data = new FormData(target);
      const name = data.get('name') as string;

      const dueDate = (data.get('dueDate') as string) || getDefaultDueDate();

      setLoading(true);

      const task = {
        organizationId,
        name,
        dueDate,
        description: ``,
        done: false,
      };

      await toaster.promise(createTask(task), {
        success: `Task created!`,
        error: `Ops, error!`,
        loading: `Creating task...`,
      });

      await router.push(`/tasks`);
    },
    [router, createTask, organizationId, setLoading]
  );

  return (
    <div className={'flex flex-col space-y-4'}>
      <div>
        <Heading type={2}>Create a new Task</Heading>
      </div>

      <form onSubmit={onCreateTask}>
        <div className={'flex flex-col space-y-3'}>
          <TextField.Label>
            Name
            <TextField.Input
              required
              name={'name'}
              placeholder={'ex. Launch on IndieHackers'}
            />
            <TextField.Hint>Hint: whatever you do, ship!</TextField.Hint>
          </TextField.Label>

          <TextField.Label>
            Due date
            <TextField.Input name={'dueDate'} type={'date'} />
          </TextField.Label>

          <div
            className={
              'flex flex-col space-y-2 md:space-y-0 md:space-x-2' +
              ' md:flex-row'
            }
          >
            <Button loading={state.loading}>
              <If condition={state.loading} fallback={<>Create Task</>}>
                Creating Task...
              </If>
            </Button>

            <Button color={'transparent'} href={'/tasks'}>
              Go back
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

function getDefaultDueDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(23, 59, 59);

  return date.toDateString();
}

export default CreateTaskForm;
