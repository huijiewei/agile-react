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
import { HttpMethod } from '@shared/utils/http';

type ExportBaseOption = {
  apiMethod?: HttpMethod;
  apiEndpoint: string;
};

type ExportButtonDownloadProps = ButtonProps &
  ExportBaseOption & {
    onSuccess?: () => void;
  };

type ExportButtonProps = ButtonProps &
  ExportBaseOption & {
    confirmMessage?: string;
  };

const ExportDownloadButton = (props: PropsWithChildren<ExportButtonDownloadProps>): JSX.Element => {
  const { apiMethod = 'GET', apiEndpoint, onSuccess, children, ...restProps } = props;

  const [loading, setLoading] = useState(false);

  const { apiDownload } = useHttp();
  const { search } = useLocation();
  const { setError } = useErrorDispatch();

  const isMounted = useMountedState();
  const newCancelToken = useCancelToken();

  const onClickDownload = async () => {
    setLoading(true);

    const result = await apiDownload({
      method: apiMethod,
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
      onSuccess && onSuccess();
    }
  };

  return (
    <Button isLoading={loading} onClick={onClickDownload} {...restProps}>
      {children}
    </Button>
  );
};

const ExportButton = (props: PropsWithChildren<ExportButtonProps>): JSX.Element => {
  const {
    apiMethod,
    apiEndpoint,
    confirmMessage,
    variant = 'outline',
    size = 'sm',
    colorScheme = 'teal',
    children,
    ...restProps
  } = props;
  const initialFocusRef = useRef(null);

  const { onOpen, onClose, isOpen } = useDisclosure();

  const onClickCancel = async () => {
    onClose();
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
              <Button onClick={onClickCancel} variant="outline" ref={initialFocusRef}>
                取消
              </Button>

              <ExportDownloadButton
                apiMethod={apiMethod}
                apiEndpoint={apiEndpoint}
                colorScheme={colorScheme}
                onSuccess={onClose}
                {...restProps}
              >
                确定
              </ExportDownloadButton>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  ) : (
    <ExportDownloadButton
      apiMethod={apiMethod}
      apiEndpoint={apiEndpoint}
      colorScheme={colorScheme}
      size={size}
      variant={variant}
      {...restProps}
    >
      {children}
    </ExportDownloadButton>
  );
};

export { ExportButton };
