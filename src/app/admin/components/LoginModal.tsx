import LoginForm from '@admin/components/LoginForm';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';

const LoginModal = () => {
  return (
    <Modal isOpen={true} isCentered={true}>
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
