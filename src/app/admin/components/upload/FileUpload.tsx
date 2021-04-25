import { BaseUpload, FileUploadProps } from '@admin/components/upload/_Upload';
import { forwardRef } from '@chakra-ui/react';

const FileUpload = forwardRef<FileUploadProps, 'div'>((props, ref) => {
  const { label = '上传文件', ...restProps } = props;

  return <BaseUpload label={label} ref={ref} apiEndpoint={'misc/file-upload-option'} {...restProps} />;
});

export { FileUpload };
