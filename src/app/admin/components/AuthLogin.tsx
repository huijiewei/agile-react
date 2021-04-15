import { AuthLoginAction, useAuthLoginDispatch, useAuthLoginState } from '@shared/contexts/AuthLoginContext';
import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '@admin/components/LoginForm';
import { Center, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useLoginDirect } from '@admin/hooks/useLoginDirect';

const LoginDirect = () => {
  const direct = useLoginDirect();

  return <Navigate to={direct} replace={true} />;
};

const LoginModal = ({ isOpened }: { isOpened: boolean }) => {
  const { resetLoginAction } = useAuthLoginDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isOpened);
  }, [isOpened, setIsOpen]);

  const onClose = () => {
    resetLoginAction();
  };

  const onSuccess = () => {
    setIsOpen(false);
  };

  return (
    <Modal isCentered size="sm" closeOnEsc={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={6}>
        <ModalHeader>
          <Center>管理员登录</Center>
        </ModalHeader>
        <ModalBody>
          <LoginForm onSuccess={onSuccess} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const AuthLogin = ({ children }: { children: ReactNode }) => {
  const authLoginAction = useAuthLoginState();

  if (authLoginAction == AuthLoginAction.DIRECT) {
    return <LoginDirect />;
  }

  return (
    <>
      {children}
      <LoginModal isOpened={authLoginAction == AuthLoginAction.MODAL} />
    </>
  );
};

export { AuthLogin };
