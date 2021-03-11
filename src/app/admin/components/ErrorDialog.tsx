import { VFC } from 'react';
import { useErrorDispatch, useErrorState } from '@shared/contexts/ErrorContext';
import { useNavigate } from 'react-router-dom';
import Button from '@shared/components/button/Button';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@shared/components/modal/Modal';
import { WarningIcon } from '@shared/components/icons/WarningIcon';

const ErrorDialog: VFC = () => {
  const error = useErrorState();
  const { resetError } = useErrorDispatch();

  const navigate = useNavigate();

  const handleDialogClose = () => {
    resetError();

    if (error.historyBack) {
      navigate(-1);
    }
  };

  return (
    error && (
      <Modal isCentered closeOnOverlayClick={false} closeOnEsc={false} onClose={handleDialogClose} isOpen={error}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody className="text-center">
            <p className="mb-5">
              <WarningIcon size={10} color={'yellow-500'} />
            </p>
            <p>{error.message}</p>
          </ModalBody>
          <ModalFooter className="justify-center">
            <Button onClick={handleDialogClose}>{error.historyBack ? '返回' : '关闭'}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  );
};

export default ErrorDialog;
