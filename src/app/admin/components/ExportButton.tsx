import {
  Button,
  ButtonGroup,
  ButtonProps,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@chakra-ui/react';
import { useCancelToken, useHttp } from '@shared/contexts/HttpContext';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import { PropsWithChildren, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useMountedState } from '@shared/hooks/useMountedState';

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

  const isMounted = useMountedState();
  const newCancelToken = useCancelToken();
  const initialFocusRef = useRef(null);

  const { onOpen, onClose, isOpen } = useDisclosure();

  const onClickCancel = async () => {
    onClose();
  };

  const onClickDownload = async () => {
    setLoading(true);

    const result = await apiDownload({
      method: 'GET',
      url: apiEndpoint,
      params: {
        ...queryString.parse(search),
        page: undefined,
        size: undefined,
      },
      cancelToken: newCancelToken(),
    });

    if (!result) {
      setError('下载失败', false);
    }

    if (isMounted()) {
      setLoading(false);
      onClose();
    }
  };

  return confirmMessage ? (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} initialFocusRef={initialFocusRef} isLazy>
      <PopoverTrigger>
        <Button colorScheme={colorScheme} size={size} variant={variant} {...restProps}>
          {children}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
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
  ) : (
    <Button colorScheme={colorScheme} onClick={onClickDownload} size={size} variant={variant} {...restProps}>
      {children}
    </Button>
  );
};

export { ExportButton };
