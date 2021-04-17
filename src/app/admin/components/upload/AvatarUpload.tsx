import { ImageUpload } from '@admin/components/upload/ImageUpload';
import { forwardRef } from '@chakra-ui/react';

type AvatarUploadProps = {
  label?: string;
};

const AvatarUpload = forwardRef<AvatarUploadProps, 'div'>((props, ref) => {
  const { label = '上传头像', ...restProps } = props;

  return <ImageUpload label={label} ref={ref} {...restProps} />;
});

export { AvatarUpload };
