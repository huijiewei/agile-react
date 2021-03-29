import { AuthLoginAction, useAuthLoginDispatch, useAuthLoginState } from '@shared/contexts/AuthLoginContext';
import { To } from 'history';
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoginForm } from '@admin/components/LoginForm';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Center } from '@chakra-ui/layout';

const LoginDirect = () => {
  const location = useLocation();

  const to: To = {
    pathname: 'login',
  };

  if (location.pathname !== 'login') {
    to.search = '?direct=' + location.pathname;
  }

  return <Navigate to={to} replace={true} />;
};

const LoginModal = ({ isOpened }: { isOpened: boolean }) => {
  const { resetLoginAction } = useAuthLoginDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isOpened);
  }, [isOpened, setIsOpen]);

  const handleClose = () => {
    resetLoginAction();
  };

  const handleSuccess = () => {
    setIsOpen(false);
  };

  return (
    <Modal isCentered size="sm" closeOnEsc={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent padding={6}>
        <ModalHeader>
          <Center>管理员登录</Center>
        </ModalHeader>
        <ModalBody>
          <LoginForm onSuccess={handleSuccess} />
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
