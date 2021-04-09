import {
  Button,
  ButtonGroup,
  ButtonProps,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@chakra-ui/react';
import { PropsWithChildren, ReactNode, useRef } from 'react';
import { HttpMessage } from '@shared/contexts/HttpContext';
import { HttpError } from '@shared/utils/http';

type DeleteButtonProps = ButtonProps & {
  title?: ReactNode;
  message?: ReactNode;
  prompt?: {
    label: ReactNode;
    value: string;
  };
  onDelete: () => Promise<{ data: HttpMessage | undefined; error: HttpError | undefined }>;
  onCancel?: () => void;
  onSuccess?: (message: string) => void;
};

const DeleteButton = (props: PropsWithChildren<DeleteButtonProps>) => {
  const {
    children,
    variant = 'outline',
    size = 'xs',
    colorScheme = 'red',
    title = '你确定吗？',
    message = '记录将被删除',
    onDelete,
    onCancel,
    onSuccess,
    isLoading,
    prompt,
    ...restProps
  } = props;
  const initialFocusRef = useRef(null);

  const { onOpen, onClose, isOpen } = useDisclosure();

  const deleteClick = async () => {
    const { data } = await onDelete();

    onClose();

    if (data && onSuccess) {
      onSuccess(data.message);
    }
  };

  const onDeleteClick = async () => {
    if (prompt) {
    } else {
      await deleteClick();
    }
  };

  const onCancelClick = async () => {
    onCancel && (await onCancel());
    onClose();
  };

  return (
    <Popover
      closeOnBlur={false}
      closeOnEsc={false}
      isOpen={isOpen}
      onOpen={onOpen}
      initialFocusRef={initialFocusRef}
      isLazy
    >
      <PopoverTrigger>
        <Button colorScheme={colorScheme} size={size} variant={variant} {...restProps}>
          {children}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">{title}</PopoverHeader>
          <PopoverArrow />
          <PopoverBody>{message}</PopoverBody>
          <PopoverFooter display={'flex'} justifyContent="flex-end">
            <ButtonGroup spacing={5} size="sm">
              <Button isLoading={isLoading} onClick={onCancelClick} variant="outline" ref={initialFocusRef}>
                取消
              </Button>
              <Button isLoading={isLoading} onClick={onDeleteClick} colorScheme="red">
                删除
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export { DeleteButton };
