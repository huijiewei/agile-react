import { BaseUpload, ImageUploadProps } from '@admin/components/upload/_Upload';
import { forwardRef } from '@chakra-ui/react';

const ImageUpload = forwardRef<ImageUploadProps, 'div'>((props, ref) => {
  const { label = '上传图片', ...restProps } = props;

  return <BaseUpload label={label} ref={ref} apiEndpoint={'misc/image-upload-option'} {...restProps} />;
});

export { ImageUpload };
