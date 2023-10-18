import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';

const ConfirmDeleteTaskModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  task: string;
  onConfirm: () => void;
}> = ({ isOpen, setIsOpen, onConfirm, task }) => {
  return (
    <Modal heading={`Deleting Task`} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={'flex flex-col space-y-4'}>
        <p>
          You are about to delete the task <b>{task}</b>
        </p>

        <p>Do you want to continue?</p>

        <Button block color={'danger'} onClick={onConfirm}>
          Yep, delete task
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteTaskModal;
