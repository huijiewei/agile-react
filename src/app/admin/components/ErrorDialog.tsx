import { useErrorDispatch, useErrorState } from '@shared/contexts/ErrorContext';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const ErrorDialog = () => {
  const error = useErrorState();
  const { resetError } = useErrorDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);

  useEffect(() => {
    setIsOpen(Boolean(error));
  }, [error, setIsOpen]);

  const navigate = useNavigate();

  const handleDialogClose = () => {
    const historyBack = error && error.historyBack;

    resetError();

    if (historyBack) {
      navigate(-1);
    }
  };

  const handleButtonClick = () => {
    setIsOpen(false);
  };

  return (
    <AlertDialog
      closeOnOverlayClick={false}
      closeOnEsc={false}
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={handleDialogClose}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogBody>
          <p>{error?.message}</p>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={handleButtonClick} ref={cancelRef}>
            {error?.historyBack ? '返回' : '关闭'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ErrorDialog };
