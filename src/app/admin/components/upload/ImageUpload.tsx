import { BaseUpload, ImageUploadProps } from '@admin/components/upload/_Upload';
import { forwardRef } from '@chakra-ui/react';

const ImageUpload = forwardRef<ImageUploadProps, 'div'>((props, ref) => {
  const { buttonText = '上传图片', ...restProps } = props;

  return <BaseUpload buttonText={buttonText} ref={ref} apiEndpoint={'misc/image-upload-option'} {...restProps} />;
});

export { ImageUpload };
