import useError from '@shared/hooks/useError';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

const ErrorDialog = () => {
  const { error, removeError } = useError();
  const { onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleClick = () => {
    removeError();
  };

  return (
    <AlertDialog isOpen={!!error} leastDestructiveRef={cancelRef} onClose={onClose} isCentered={true}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader />

        <AlertDialogBody>{error && error.message}</AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={handleClick}>
            {error && error.historyBack ? '返回' : '关闭'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ErrorDialog;
