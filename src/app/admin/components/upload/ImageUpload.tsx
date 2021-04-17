import { Upload } from '@admin/components/upload/_Upload';
import { forwardRef, InputProps } from '@chakra-ui/react';

type ImageUploadProps = InputProps & {
  label?: string;
};

const ImageUpload = forwardRef<ImageUploadProps, 'input'>((props, ref) => {
  const { label = '上传图片', ...restProps } = props;

  return <Upload label={label} ref={ref} apiEndpoint={'misc/image-upload-option'} {...restProps} />;
});

export { ImageUpload };
