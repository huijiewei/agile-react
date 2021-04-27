import { Button, forwardRef } from '@chakra-ui/react';
import { useHttp } from '@shared/contexts/HttpContext';
import { requestFlatry } from '@shared/utils/http';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Upload } from '@shared/components/upload/Upload';
import { Icon } from '@shared/components/icon/Icon';
import { UploadOne } from '@icon-park/react';
import { Dict } from '@shared/utils/types';
import { useMessage } from '@shared/hooks/useMessage';
import { useMountedState } from '@shared/hooks/useMountedState';

export type FileUploadProps = {
  label?: string;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;

  isDisabled?: boolean;
  isMultiple?: boolean;
  isReadOnly?: boolean;
  maxFiles?: number;
};

export type ImageUploadProps = FileUploadProps & {
  preview?: [number, number];
  cropper?: {
    enable: boolean;
    aspectRatio: number;
    size: [number, number];
  };
  thumbs?: string[];
  defaultThumb?: string;
};

export type BaseUploadProps = ImageUploadProps & {
  apiEndpoint: string;
};

type UploadOption = {
  url: string;
  cropUrl: string;
  timeout?: number;
  paramName: string;
  dataType: 'json' | 'xml';
  params?: Dict;
  headers?: Dict;
  responseParse: string;
  sizeLimit: number;
  typesLimit: string[];
};

const BaseUpload = forwardRef<BaseUploadProps, 'div'>((props, ref) => {
  const {
    label,
    apiEndpoint,
    preview = null,
    cropper = null,
    thumbs = null,
    defaultThumb = null,
    ...restProps
  } = props;

  const { warning } = useMessage();
  const [uploadOption, setUploadOption] = useState<UploadOption>();
  const timeoutRef = useRef<number>();
  const isMounted = useMountedState();

  const { apiGet } = useHttp();

  const fetchUploadOption = useCallback<() => void>(async () => {
    timeoutRef.current && window.clearTimeout(timeoutRef.current);

    const { data } = await requestFlatry<UploadOption>(
      apiGet(apiEndpoint, { thumbs: thumbs, cropper: cropper?.enable }, false)
    );

    if (isMounted()) {
      setUploadOption(data);
    }

    if (data && data.timeout && data.timeout > 0) {
      timeoutRef.current = window.setTimeout(fetchUploadOption, data.timeout * 1000);
    }
  }, [apiGet, apiEndpoint, thumbs, cropper?.enable, isMounted]);

  useEffect(() => {
    fetchUploadOption();
  }, [fetchUploadOption]);

  useEffect(() => {
    return () => {
      timeoutRef.current && window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const onUploadRequest = useCallback((file: File, xhr: XMLHttpRequest, formData: FormData) => {
    for (const [key, value] of formData) {
      if (value.toString().indexOf('${filename}') !== -1) {
        const randomFileName = Math.random().toString(36).substring(3, 15) + '.' + file.name.split('.').pop();

        formData.set(key, value.toString().replace('${filename}', randomFileName));
      }
    }
  }, []);

  const onUploadResponse = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response: any) => {
      if (uploadOption) {
        const result =
          uploadOption.dataType == 'xml' ? new DOMParser().parseFromString(response, 'application/xml') : response;

        // eslint-disable-next-line no-new-func
        const responseParse = new Function('result', uploadOption.responseParse);

        const data = responseParse(result);

        return { url: data.original, ...data };
      }
    },
    [uploadOption]
  );

  const onUploadError = (error: string) => {
    warning(error, { isClosable: true });
  };

  return uploadOption ? (
    <Upload
      ref={ref}
      accept={uploadOption.typesLimit.map((type) => '.' + type).join(', ')}
      requestUrl={uploadOption.url}
      formDataName={uploadOption.paramName}
      requestData={uploadOption.params}
      requestHeaders={uploadOption.headers}
      responseDataType={uploadOption.dataType}
      maxFileSize={uploadOption.sizeLimit}
      onUploadRequest={onUploadRequest}
      onUploadResponse={onUploadResponse}
      onUploadError={onUploadError}
      {...restProps}
    >
      <Button iconSpacing={1.5} variant={'outline'} size={'xs'} leftIcon={<Icon as={UploadOne} />}>
        {label}
      </Button>
    </Upload>
  ) : null;
});

export { BaseUpload };
