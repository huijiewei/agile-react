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
import { PropsWithChildren, ReactNode, useRef } from 'react';
import { HttpMessage } from '@shared/contexts/HttpContext';
import { HttpError } from '@shared/utils/http';
import { Controller, useForm } from 'react-hook-form';
import { mergeRefs } from '@chakra-ui/react-utils';

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

const DeleteButton = (props: PropsWithChildren<DeleteButtonProps>): JSX.Element => {
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
    reset,
    control,
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

  const onClickDelete = async () => {
    if (prompt) {
      if (isValid) {
        await deleteClick();
      }
    } else {
      await deleteClick();
    }
  };

  const onClickCancel = async () => {
    reset();
    onCancel && (await onCancel());
    onClose();
  };

  return (
    <Popover closeOnBlur={false} isOpen={isOpen} onOpen={onOpen} initialFocusRef={initialFocusRef} isLazy>
      <PopoverTrigger>
        <Button colorScheme={colorScheme} size={size} variant={variant} {...restProps}>
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
                  <Controller
                    name={'deletePrompt'}
                    control={control}
                    rules={{
                      required: true,
                      validate: (v) => {
                        return v == prompt.value;
                      },
                    }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Input
                        name={'deletePrompt'}
                        onChange={onChange}
                        onBlur={onBlur}
                        defaultValue={value}
                        ref={mergeRefs(ref, initialFocusRef)}
                        autoComplete={'off'}
                        type="text"
                      />
                    )}
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
                onClick={onClickCancel}
                variant="outline"
                ref={prompt ? null : initialFocusRef}
              >
                取消
              </Button>
              <Button
                isDisabled={prompt ? !isValid : false}
                isLoading={isLoading}
                onClick={onClickDelete}
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
