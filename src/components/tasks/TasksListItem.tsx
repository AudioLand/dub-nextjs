import { useCallback, useState } from 'react';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';
import toaster from 'react-hot-toast';

import { Task } from '~/lib/tasks/types/task';
import Heading from '~/core/ui/Heading';
import IconButton from '~/core/ui/IconButton';
import { Tooltip } from '~/core/ui/Tooltip';
import useDeleteTask from '~/lib/tasks/hooks/use-delete-task';
import ConfirmDeleteTaskModal from '~/components/tasks/ConfirmDeleteTaskModal';
import useUpdateTask from '~/lib/tasks/hooks/use-update-task';
import useTimeAgo from '~/lib/tasks/hooks/use-time-ago';

const TasksListItem: React.FC<{
  task: WithId<Task>;
}> = ({ task }) => {
  const getTimeAgo = useTimeAgo();
  const deleteTask = useDeleteTask(task.id);
  const updateTask = useUpdateTask(task.id);

  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = useCallback(() => {
    const deleteTaskPromise = deleteTask();

    return toaster.promise(deleteTaskPromise, {
      success: `Task deleted!`,
      loading: `Deleting task...`,
      error: `Ops, error! We could not delete task`,
    });
  }, [deleteTask]);

  const onDoneChange = useCallback(
    (done: boolean) => {
      const promise = updateTask({ done });

      return toaster.promise(promise, {
        success: `Task updated!`,
        loading: `Updating task...`,
        error: `Ops, error! We could not update task`,
      });
    },
    [updateTask]
  );

  return (
    <>
      <div
        className={'rounded border p-4 transition-colors dark:border-black-400'}
      >
        <div className={'flex items-center space-x-4'}>
          <div>
            <Tooltip content={task.done ? `Mark as not done` : `Mark as done`}>
              <input
                className={'Toggle cursor-pointer'}
                type="checkbox"
                defaultChecked={task.done}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  return onDoneChange(e.currentTarget.checked);
                }}
              />
            </Tooltip>
          </div>

          <div className={'flex flex-1 flex-col space-y-0.5'}>
            <Heading type={5}>
              <Link
                className={'hover:underline'}
                href={`/tasks/[id]`}
                as={`/tasks/${task.id}`}
                passHref
              >
                {task.name}
              </Link>
            </Heading>

            <div>
              <p className={'text-xs text-gray-400 dark:text-gray-500'}>
                Due {getTimeAgo(new Date(task.dueDate))}
              </p>
            </div>
          </div>

          <div className={'flex justify-end'}>
            <Tooltip content={`Delete Task`}>
              <IconButton
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.stopPropagation();
                  setIsDeleting(true);
                }}
              >
                <TrashIcon className={'h-5 text-red-500'} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      <ConfirmDeleteTaskModal
        isOpen={isDeleting}
        setIsOpen={setIsDeleting}
        task={task.name}
        onConfirm={onDelete}
      />
    </>
  );
};

export default TasksListItem;
