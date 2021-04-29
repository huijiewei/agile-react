import { ChangeEvent, MutableRefObject, useRef, useState } from 'react';
import { Dict } from '@shared/utils/types';
import { InputProps, useControllableState, useFormControl } from '@chakra-ui/react';

type UploadRequestOption = {
  action: string;
  method?: 'POST' | 'PUT';
  timeout?: number;

  fieldName?: string;

  onBefore?: (file: File, xhr: XMLHttpRequest, formData: FormData) => void;
  onProgress?: (event: ProgressEvent) => void;
  onAfter?: <E, T>(response: E) => T;
  onUpload?: (data: { url: string }) => void;
  onError?: (error: string) => void;
  onAbort?: () => void;
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

  xhr.upload.onprogress = (e) => {
    console.log(e);
  };

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 0 || xhr.status >= 500 || xhr.status >= 400) {
        options.onError && options.onError('文件上传错误');
      } else {
        const data = options.onAfter ? options.onAfter(xhr.response) : xhr.response;

        options.onUpload && options.onUpload(data);
      }
    }
  };

  const formData = new FormData();

  formData.append(options.fieldName || 'file', file.file, file.file.name);

  xhr.open(options.method || 'POST', options.action, true);

  if (options.onBefore) {
    options.onBefore(file.file, xhr, formData);
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

export type UseUploadProps = UploadRequestOption & {
  name?: string;
  accept?: string;

  value?: string | string[];
  defaultValue?: string | string[];

  maxFiles?: number;
  maxFileSize?: number;

  onChange?: (value: string | string[]) => void;

  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isMultiple?: boolean;
};

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

    action,
    method = 'POST',
    timeout = 0,
    fieldName = 'file',

    onBefore,
    onProgress,
    onAfter,
    onUpload,
    onError,

    ...htmlProps
  } = props;

  const [loading, setLoading] = useState(false);

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
        onError && onError(`文件: ${file.name} 大小超出 ${humanFileSize(maxFileSize)}`);
      } else {
        files.push(file);
      }
    });

    setLoading(true);

    await uploadFiles(files, {
      action: action,
      timeout: timeout,
      method: method,
      fieldName: fieldName,
      onBefore: onBefore,
      onProgress: onProgress,
      onAfter: onAfter,
      onUpload: (data) => {
        if (onUpload) {
          onUpload(data);
        }

        if (isMultiple) {
          setValue((prevState) => [...prevState, data.url].filter((url) => url.length > 0));
        } else {
          setValue(data.url);
        }
      },
      onError: onError,
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
