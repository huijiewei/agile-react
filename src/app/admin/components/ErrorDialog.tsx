import { useRef } from 'react';
import { useErrorDispatch, useErrorState } from '@shared/contexts/ErrorContext';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Center,
} from '@chakra-ui/react';
import { AlertCircle } from 'react-feather';

const ErrorDialog = () => {
  const error = useErrorState();
  const { resetError } = useErrorDispatch();
  const cancelRef = useRef();

  const navigate = useNavigate();

  const onClose = () => {
    resetError();

    if (error.historyBack) {
      navigate(-1);
    }
  };

  return (
    error && (
      <AlertDialog
        isCentered
        closeOnOverlayClick={false}
        closeOnEsc={false}
        onClose={onClose}
        isOpen={true}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader />
          <AlertDialogBody>
            <Center marginBottom={5}>
              <AlertCircle color="orange" size={36} />
            </Center>
            <Center>{error.message}</Center>
          </AlertDialogBody>
          <AlertDialogFooter justifyContent="center">
            <Button ref={cancelRef} onClick={onClose}>
              {error.historyBack ? '返回' : '关闭'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  );
};

export default ErrorDialog;
