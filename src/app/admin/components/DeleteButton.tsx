import {
  Button,
  ButtonGroup,
  ButtonProps,
  FormControl,
  FormLabel,
  Input,
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
import { PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import { HttpMessage } from '@shared/contexts/HttpContext';
import { HttpError } from '@shared/utils/http';
import { useForm } from 'react-hook-form';

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
  const {
    register,
    trigger,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'all',
  });

  const { onOpen, onClose, isOpen } = useDisclosure();

  const deleteClick = async () => {
    const { data } = await onDelete();

    onClose();

    if (data && onSuccess) {
      onSuccess(data.message);
    }
  };

  useEffect(() => {
    if (prompt) {
      trigger('deletePrompt');
    }
  }, [prompt, trigger]);

  const onDeleteClick = async () => {
    if (prompt) {
      if (isValid) {
        await deleteClick();
      }
    } else {
      await deleteClick();
    }
  };

  const onCancelClick = async () => {
    reset();
    onCancel && (await onCancel());
    onClose();
  };

  return (
    <Popover closeOnBlur={false} isOpen={isOpen} onOpen={onOpen} initialFocusRef={initialFocusRef} isLazy>
      <PopoverTrigger>
        <Button as={'span'} colorScheme={colorScheme} size={size} variant={variant} {...restProps}>
          {children}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">{title}</PopoverHeader>
          <PopoverArrow />
          <PopoverBody>
            {prompt ? (
              <>
                <FormControl id="deletePrompt" isInvalid={isValid}>
                  <FormLabel color={'gray.500'}>{prompt.label}</FormLabel>
                  <Input
                    {...register('deletePrompt', {
                      required: true,
                      validate: (v) => {
                        return v == prompt.value;
                      },
                    })}
                    autoComplete={'off'}
                    type="text"
                  />
                </FormControl>
              </>
            ) : (
              message
            )}
          </PopoverBody>
          <PopoverFooter display={'flex'} justifyContent="flex-end">
            <ButtonGroup spacing={5} size="sm">
              <Button
                isLoading={isLoading}
                onClick={onCancelClick}
                variant="outline"
                ref={prompt ? null : initialFocusRef}
              >
                取消
              </Button>
              <Button
                isDisabled={prompt ? !isValid : false}
                isLoading={isLoading}
                onClick={onDeleteClick}
                colorScheme={colorScheme}
              >
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
