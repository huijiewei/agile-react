import { Upload } from '@admin/components/upload/_Upload';
import { forwardRef, InputProps } from '@chakra-ui/react';

type FileUploadProps = InputProps & {
  label?: string;
};

const FileUpload = forwardRef<FileUploadProps, 'input'>((props, ref) => {
  const { label = '上传文件', ...restProps } = props;

  return <Upload label={label} ref={ref} apiEndpoint={'misc/file-upload-option'} {...restProps} />;
});

export { FileUpload };
