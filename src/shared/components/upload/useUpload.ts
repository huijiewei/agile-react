import { ChangeEvent, MutableRefObject, useRef, useState } from 'react';
import { Dict } from '@shared/utils/types';
import { InputProps, useControllableState, useFormControl } from '@chakra-ui/react';

type UploadRequestOption = {
  requestUrl: string;
  requestMethod?: 'POST' | 'PUT';
  requestTimeout?: number;
  requestHeaders?: Dict<string>;
  requestData?: Dict;

  formDataName?: string;
  withCredentials?: boolean;
  responseDataType?: 'json' | 'xml';

  onUploadRequest?: (file: File, xhr: XMLHttpRequest, formData: FormData) => void;
  onUploadProgress?: (event: ProgressEvent) => void;
  onUploadSuccess?: (data: { url: string }) => void;
  onUploadResponse?: <E, T>(response: E) => T;
  onUploadError?: (error: string) => void;
  onUploadAbort?: () => void;
};

type UploadFile = {
  file: File;
  uploading: boolean;
  url?: string;
};

const humanFileSize = (size: number): string => {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

const uploadFile = (file: UploadFile, options: UploadRequestOption) => {
  if (file.uploading) {
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.responseType = options.responseDataType == 'json' ? 'json' : 'text';
  xhr.withCredentials = options.withCredentials || false;

  if (options.requestTimeout) {
    xhr.timeout = options.requestTimeout;
  }

  xhr.upload.onprogress = (e) => {
    console.log(e);
  };

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 0 || xhr.status >= 500 || xhr.status >= 400) {
        options.onUploadError && options.onUploadError('文件上传错误');
      } else {
        const data = options.onUploadResponse ? options.onUploadResponse(xhr.response) : xhr.response;

        options.onUploadSuccess && options.onUploadSuccess(data);
      }
    }
  };

  const formData = new FormData();

  if (options.requestData) {
    for (const [key, value] of Object.entries(options.requestData)) {
      formData.append(key, value);
    }
  }

  formData.append(options.formDataName || 'file', file.file, file.file.name);

  if (options.onUploadRequest) {
    options.onUploadRequest(file.file, xhr, formData);
  }

  xhr.open(options.requestMethod || 'POST', options.requestUrl, true);

  if (options.requestHeaders) {
    for (const [key, value] of Object.entries(options.requestHeaders)) {
      xhr.setRequestHeader(key, value);
    }
  }

  xhr.send(formData);
};

const uploadFiles = async (files: File[], options: UploadRequestOption) => {
  files.forEach((file) => {
    uploadFile(
      {
        file: file,
        uploading: false,
      },
      options
    );
  });
};

export type UseUploadProps = {
  name?: string;
  accept?: string;

  value?: string | string[];
  defaultValue?: string | string[];

  maxFiles?: number;
  maxFileSize?: number;

  onChange?: (value: string | string[]) => void;

  onFileReject?: () => void;

  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isMultiple?: boolean;
} & UploadRequestOption;

type UseUpload = {
  loading: boolean;
  inputValue: string | string[];
  inputProps: InputProps;
  fileInputRef: MutableRefObject<HTMLInputElement | null>;
  fileInputProps: Dict;
  onFileInputClick: () => void;
  onFileInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const useUpload = (props: UseUploadProps): UseUpload => {
  const {
    value: valueProp,
    defaultValue,

    maxFiles,
    maxFileSize,

    onChange,

    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    isMultiple = false,

    requestUrl,
    requestMethod = 'POST',
    requestTimeout = 0,
    requestHeaders,
    requestData,
    responseDataType,
    withCredentials = false,
    formDataName = 'file',

    onUploadRequest,
    onUploadProgress,
    onUploadResponse,
    onUploadSuccess,
    onUploadError,

    ...htmlProps
  } = props;

  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<Dict<UploadFile>>({});

  const [inputValue, setValue] = useControllableState({
    value: isMultiple && typeof valueProp == 'string' ? [valueProp] : valueProp,
    defaultValue: isMultiple && typeof defaultValue == 'string' ? [defaultValue] : defaultValue,
    onChange,
  });

  const inputProps = useFormControl<HTMLInputElement>({
    isDisabled: isDisabled,
    isReadOnly: isReadOnly,
    isRequired: isRequired,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputProps = useFormControl<HTMLInputElement>({
    id: inputProps.id + '-file',
    isDisabled: isDisabled,
    isReadOnly: isReadOnly,
  });

  const onFileInputClick = () => fileInputRef.current?.click();

  const onFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files == null) {
      return;
    }

    const files: File[] = [];

    [...event.target.files].forEach((file) => {
      if (maxFileSize && maxFileSize > 0 && maxFileSize < file.size) {
        onUploadError && onUploadError(`文件: ${file.name} 大小超出 ${humanFileSize(maxFileSize)}`);
      } else {
        files.push(file);
      }
    });

    setLoading(true);

    await uploadFiles(files, {
      requestUrl: requestUrl,
      requestTimeout: requestTimeout,
      requestMethod: requestMethod,
      requestData: requestData,
      requestHeaders: requestHeaders,
      responseDataType: responseDataType,
      withCredentials: withCredentials,
      formDataName: formDataName,
      onUploadRequest: onUploadRequest,
      onUploadProgress: onUploadProgress,
      onUploadResponse: onUploadResponse,
      onUploadSuccess: (data) => {
        if (onUploadSuccess) {
          onUploadSuccess(data);
        }

        if (isMultiple) {
          setValue((prevState) => [...prevState, data.url].filter((url) => url.length > 0));
        } else {
          setValue(data.url);
        }
      },
      onUploadError: onUploadError,
    });

    setLoading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    loading,
    inputValue,
    inputProps,
    fileInputRef,
    fileInputProps,
    onFileInputClick,
    onFileInputChange,
  };
};

export { useUpload };
