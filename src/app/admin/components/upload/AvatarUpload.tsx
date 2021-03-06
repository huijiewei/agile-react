import { ImageUpload } from '@admin/components/upload/ImageUpload';
import { forwardRef } from '@chakra-ui/react';

type AvatarUploadProps = {
  label?: string;
  value?: string | string[];
  defaultValue?: string | string[];
  isDisabled?: boolean;
  onChange?: (value: string | string[]) => void;
};

const AvatarUpload = forwardRef<AvatarUploadProps, 'div'>((props, ref) => {
  const { label = '上传头像', ...restProps } = props;

  return <ImageUpload buttonText={label} ref={ref} {...restProps} />;
});

export { AvatarUpload };
