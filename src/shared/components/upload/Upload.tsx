import { Dict } from '@shared/utils/types';
import { Box, forwardRef, Input, InputGroup, InputProps, List, useFormControl } from '@chakra-ui/react';
import { ChangeEvent, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';

type OnSuccess = (data: UploadResult) => void;
type OnError = (error: string) => void;

type UploadResult = {
  original: string;
};

type UploadProps = InputProps & {
  action: string;
  paramName: string;
  params?: Dict;
  accept?: string;
  headers?: Dict;
  data?: Dict;
  isMultiple?: boolean;
  onSuccess?: OnSuccess;
  onError?: OnError;
};

const uploadFiles = async (
  url: string,
  paramName: string,
  files: FileList,
  params: Dict | null,
  data: Dict | null,
  headers: Dict | null,
  onSuccess: OnSuccess | null,
  onError: OnError | null
) => {
  const promises: Promise<AxiosResponse>[] = [];

  const config = {
    params: params,
    headers: headers,
  };

  [...files].forEach((file) => {
    const formData = new FormData();

    if (data) {
      for (const [key, item] of Object.entries(data)) {
        formData.append(key, item);
      }
    }

    formData.append(paramName, file, file.name);

    promises.push(axios.post<UploadResult>(url, formData, config));
  });

  Promise.all(promises)
    .then((responses) => {
      responses.forEach((response) => {
        onSuccess && onSuccess(response.data);
      });
    })
    .catch((error) => {
      if (onError) {
        console.log(error.response);
        if (!error.response) {
          onError(error.message);
        } else {
          onError(
            error.response.data.detail ||
              error.response.data.message ||
              error.response.data.title ||
              error.response.statusText ||
              '文件上传错误'
          );
        }
      }
    });
};

const Upload = forwardRef<UploadProps, 'input'>((props, ref) => {
  const {
    action,
    accept,
    paramName,
    params = null,
    headers = null,
    data = null,
    isDisabled = false,
    isMultiple = false,
    children,
    value,
    onSuccess = null,
    onError = null,
    ...ownProps
  } = props;

  const input = useFormControl<HTMLInputElement>(ownProps);

  const internalRef = useRef<HTMLInputElement | null>(null);

  const onClick = () => internalRef.current?.click();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files == null) {
      return;
    }

    await uploadFiles(action, paramName, files, params, data, headers, onSuccess, onError);

    if (internalRef.current) {
      internalRef.current.value = '';
    }
  };

  return (
    <Box>
      <List></List>
      <InputGroup isTruncated width={'fit-content'} onClick={onClick}>
        <Input value={value} type={'hidden'} {...input} ref={ref} />
        <Input
          id={input.id + '-file'}
          onChange={onChange}
          multiple={isMultiple}
          isDisabled={isDisabled}
          accept={accept}
          type={'file'}
          hidden
          ref={internalRef}
        />
        {children}
      </InputGroup>
    </Box>
  );
});

export { Upload };
