import { Button, forwardRef, InputProps, useFormControl } from '@chakra-ui/react';
import { useHttp } from '@shared/contexts/HttpContext';
import { requestFlatry } from '@shared/utils/http';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Upload as Uploader } from '@shared/components/upload/Upload';
import { Icon } from '@shared/components/icon/Icon';
import { UploadOne } from '@icon-park/react';
import { Dict } from '@shared/utils/types';

type UploadProps = InputProps & {
  apiEndpoint: string;
  label: string;
  preview?: [number, number];
  cropper?: {
    enable: boolean;
    aspectRatio: number;
    size: [number, number];
  };
  thumbs?: string[];
  defaultThumb?: string;
  isMultiple?: boolean;
};

type UploadOption = {
  url: string;
  paramName: string;
  params?: Dict;
  timeout?: number;
  sizeLimit: number;
  typesLimit: string[];
};

const Upload = forwardRef<UploadProps, 'input'>((props, ref) => {
  const { apiEndpoint, label, preview = null, cropper = null, thumbs = null, defaultThumb = null, ...ownProps } = props;

  const [uploadOption, setUploadOption] = useState<UploadOption>();
  const timeoutRef = useRef<number>();

  const { apiGet } = useHttp();

  const fetchUploadOption = useCallback(async () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }

    const { data } = await requestFlatry<UploadOption>(
      apiGet(apiEndpoint, { thumbs: thumbs, cropper: cropper?.enable }, false)
    );

    setUploadOption(data);

    if (data && data.timeout && data.timeout > 0) {
      timeoutRef.current = window.setTimeout(fetchUploadOption, data.timeout * 1000);
    }
  }, [apiEndpoint, apiGet, thumbs, cropper]);

  useEffect(() => {
    fetchUploadOption().then();
  }, [fetchUploadOption]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
    };
  }, []);

  const input = useFormControl<HTMLInputElement>(ownProps);

  return uploadOption ? (
    <Uploader
      ref={ref}
      accept={uploadOption.typesLimit.map((type) => '.' + type).join(', ')}
      action={uploadOption.url}
      paramName={uploadOption.paramName}
      params={uploadOption.params}
      onError={(error: any) => console.log(error)}
      {...input}
    >
      <Button variant={'outline'} size={'xs'} type={'button'} leftIcon={<Icon as={UploadOne} />}>
        {label}
      </Button>
    </Uploader>
  ) : null;
});

export { Upload };
