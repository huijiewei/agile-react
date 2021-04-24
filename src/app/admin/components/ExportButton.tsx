import {
  Button,
  ButtonGroup,
  ButtonProps,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@chakra-ui/react';
import { useHttp } from '@shared/contexts/HttpContext';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import { PropsWithChildren, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

type ExportButtonProps = ButtonProps & {
  apiEndpoint: string;
  confirmMessage?: string;
};

const ExportButton = (props: PropsWithChildren<ExportButtonProps>): JSX.Element => {
  const {
    apiEndpoint,
    confirmMessage,
    variant = 'outline',
    size = 'sm',
    colorScheme = 'teal',
    children,
    ...restProps
  } = props;

  const { apiDownload } = useHttp();
  const { search } = useLocation();
  const { setError } = useErrorDispatch();
  const [loading, setLoading] = useState(false);

  const initialFocusRef = useRef(null);

  const { onOpen, onClose, isOpen } = useDisclosure();

  const onClickCancel = async () => {
    onClose();
  };

  const onClickDownload = async () => {
    setLoading(true);

    const result = await apiDownload('GET', apiEndpoint, {
      ...queryString.parse(search),
      page: undefined,
      size: undefined,
    });

    setLoading(false);

    if (!result) {
      setError('下载失败', false);
    }

    onClose();
  };

  if (confirmMessage) {
    return (
      <Popover closeOnBlur={false} isOpen={isOpen} onOpen={onOpen} initialFocusRef={initialFocusRef} isLazy>
        <PopoverTrigger>
          <Button colorScheme={colorScheme} size={size} variant={variant} {...restProps}>
            {children}
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverBody>{confirmMessage}</PopoverBody>
            <PopoverFooter display={'flex'} justifyContent="flex-end">
              <ButtonGroup spacing={5} size="sm">
                <Button isLoading={loading} onClick={onClickCancel} variant="outline" ref={initialFocusRef}>
                  取消
                </Button>
                <Button isLoading={loading} onClick={onClickDownload} colorScheme={colorScheme}>
                  确定
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    );
  }

  return (
    <Button colorScheme={colorScheme} onClick={onClickDownload} size={size} variant={variant} {...restProps}>
      {children}
    </Button>
  );
};

export { ExportButton };
