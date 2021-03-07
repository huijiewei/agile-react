import { VFC } from 'react';
import { useErrorDispatch, useErrorState } from '@shared/contexts/ErrorContext';
import { useNavigate } from 'react-router-dom';
import Button from '@shared/components/button/Button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay } from '@shared/components/modal/Modal';

const ErrorDialog: VFC = () => {
  const error = useErrorState();
  const { resetError } = useErrorDispatch();

  const navigate = useNavigate();

  const handleDialogClose = (event, reason) => {
    if (reason) {
      return;
    }

    resetError();

    if (error.historyBack) {
      navigate(-1);
    }
  };

  return (
    error && (
      <Modal isOpen={error}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <p>{error.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleDialogClose}>{error.historyBack ? '返回' : '关闭'}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  );
};

export default ErrorDialog;
