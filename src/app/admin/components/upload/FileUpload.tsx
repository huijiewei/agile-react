import { BaseUpload, FileUploadProps } from '@admin/components/upload/_Upload';
import { forwardRef } from '@chakra-ui/react';

const FileUpload = forwardRef<FileUploadProps, 'div'>((props, ref) => {
  const { buttonText = '上传文件', ...restProps } = props;

  return <BaseUpload buttonText={buttonText} ref={ref} apiEndpoint={'misc/file-upload-option'} {...restProps} />;
});

export { FileUpload };
