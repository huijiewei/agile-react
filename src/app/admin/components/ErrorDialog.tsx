import { useErrorDispatch, useErrorState } from '@shared/contexts/ErrorContext';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  Center,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { Info } from '@icon-park/react';

const ErrorDialog = (): JSX.Element => {
  const error = useErrorState();
  const cancelRef = useRef(null);

  const { resetError } = useErrorDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose() {
      const historyBack = error && error.historyBack;

      resetError();

      if (historyBack) {
        navigate(-1);
      }
    },
  });

  useEffect(() => {
    if (error) {
      onOpen();
    }
  }, [error, onOpen]);

  const navigate = useNavigate();

  return (
    <AlertDialog
      isCentered
      closeOnOverlayClick={false}
      closeOnEsc={false}
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialogOverlay />
      <AlertDialogContent padding={3}>
        <AlertDialogBody>
          <Center marginTop={3} marginBottom={5}>
            <Icon strokeWidth={3} boxSize={50} size="50" as={Info} color="yellow.500" />
          </Center>
          <Center as={Text}>{error?.message}</Center>
        </AlertDialogBody>
        <AlertDialogFooter sx={{ justifyContent: 'center' }}>
          <Button onClick={onClose} ref={cancelRef}>
            {error?.historyBack ? '返回' : '关闭'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ErrorDialog };
