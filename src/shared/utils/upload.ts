export const humanFileSize = (size: number): string => {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

export type UploadOption = {
  action: string;
  method?: 'POST' | 'PUT';

  fieldName?: string;

  onBefore?: (file: File, xhr: XMLHttpRequest, formData: FormData) => void;
  onProgress?: (precent: number) => void;
  onSuccess?: <E, T>(response: E) => T;
  onError?: (error: string) => void;
  onAbort?: () => void;
};

const upload = (
  file: File,
  options: {
    onBefore: ((file: File, xhr: XMLHttpRequest, formData: FormData) => void) | undefined;
    onProgress: ((precent: number) => void) | undefined;
    fieldName: string;
    onError: ((error: string) => void) | undefined;
    method: string;
    action: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (response: any) => unknown;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener(
      'progress',
      (event) => {
        options.onProgress && options.onProgress((event.loaded / event.total) * 100);
      },
      false
    );

    xhr.addEventListener(
      'load',
      () => {
        resolve(options.onSuccess ? options.onSuccess(xhr.response) : xhr.response);
      },
      false
    );
    xhr.addEventListener(
      'error',
      () => {
        options.onError && options.onError('文件上传错误');

        reject(xhr.response);
      },
      false
    );
    xhr.addEventListener(
      'abort',
      () => {
        options.onError && options.onError('文件上传取消');

        reject(xhr.response);
      },
      false
    );

    const formData = new FormData();

    formData.append(options.fieldName || 'file', file, file.name);

    xhr.open(options.method || 'POST', options.action);

    options.onBefore && options.onBefore(file, xhr, formData);

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.send(formData);
  });
};

export { upload };
