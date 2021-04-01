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
  Text,
  Icon,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Info } from '@icon-park/react';

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
      isCentered
      closeOnOverlayClick={false}
      closeOnEsc={false}
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={handleDialogClose}
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
          <Button onClick={handleButtonClick} ref={cancelRef}>
            {error?.historyBack ? '返回' : '关闭'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ErrorDialog };
