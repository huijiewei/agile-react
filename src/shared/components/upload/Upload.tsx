import { Dict } from '@shared/utils/types';
import { Button, ButtonProps, InputProps } from '@chakra-ui/react';

type UploadProps = InputProps & {
  action: string;
  accept?: string;
  headers: Dict;
  buttonProps?: ButtonProps;
};

const Upload = (props: UploadProps) => {
  const { buttonProps } = props;

  return <Button {...buttonProps}>上传</Button>;
};

export { Upload };
