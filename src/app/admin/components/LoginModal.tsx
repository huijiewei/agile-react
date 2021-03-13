import LoginForm from '@admin/components/LoginForm';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';

const LoginModal = () => {
  const handleClose = () => {
    console.log(1);
  };

  return (
    <Modal isOpen={true} isCentered={true} onClose={handleClose}>
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
