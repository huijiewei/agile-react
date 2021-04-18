import { ChangeEvent, MutableRefObject, useRef } from 'react';
import { Dict } from '@shared/utils/types';
import axios, { AxiosResponse } from 'axios';
import { InputProps, useFormControl } from '@chakra-ui/react';

type UploadResult = {
  original: string;
  thumbs?: { url: string; thumb: string }[];
};

type OnUploadSuccess = (data: UploadResult) => void;
type OnUploadError = (error: string) => void;

const uploadFiles = async (
  url: string,
  paramName: string,
  files: FileList,
  params?: Dict,
  data?: Dict,
  headers?: Dict,
  onUploadSuccess?: OnUploadSuccess,
  onUploadError?: OnUploadError
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
        onUploadSuccess && onUploadSuccess(response.data);
      });
    })
    .catch((error) => {
      if (onUploadError) {
        console.log(error.response);
        if (!error.response) {
          onUploadError(error.message);
        } else {
          onUploadError(
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

export type UseUploadProps = InputProps & {
  action: string;
  paramName: string;
  params?: Dict;
  headers?: Dict;
  data?: Dict;
  onUploadSuccess?: OnUploadSuccess;
  onUploadError?: OnUploadError;
};

type UseUpload = {
  inputProps: InputProps;
  inputValue: string | number | readonly string[] | undefined;
  fileInputId: string;
  fileInputRef: MutableRefObject<HTMLInputElement | null>;
  onFileInputClick: () => void;
  onFileInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const useUpload = (props: UseUploadProps): UseUpload => {
  const {
    action,
    paramName,
    params,
    headers,
    data,
    onUploadSuccess,
    onUploadError,
    value: inputValue,
    ...ownProps
  } = props;

  const inputProps = useFormControl<HTMLInputElement>(ownProps);

  const fileInputId = inputProps.id + '-file';

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onFileInputClick = () => fileInputRef.current?.click();

  const onFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files == null) {
      return;
    }

    await uploadFiles(action, paramName, files, params, data, headers, onUploadSuccess, onUploadError);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    inputProps,
    inputValue,
    fileInputId,
    fileInputRef,
    onFileInputClick,
    onFileInputChange,
  };
};

export { useUpload };
