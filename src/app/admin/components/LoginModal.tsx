import LoginForm from '@admin/components/LoginForm';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

const LoginModal = () => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <Modal size="sm" isOpen={isOpen} isCentered closeOnOverlayClick={false} closeOnEsc={false} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">管理员登录</ModalHeader>
        <ModalBody>
          <LoginForm />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
