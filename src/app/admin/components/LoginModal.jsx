import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody } from '@chakra-ui/react';
import LoginForm from '@admin/components/LoginForm';

const LoginModal = () => {
  return (
    <Modal isOpen="true" closeOnOverlayClick={false} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>登录</ModalHeader>
        <ModalBody>
          <LoginForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
