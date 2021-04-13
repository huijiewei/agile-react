import { Dict } from '@shared/utils/types';
import { Button, ButtonProps, InputProps } from '@chakra-ui/react';

type UploadProps = InputProps & {
  action: string;
  accept?: string;
  headers: Dict;
  buttonProps?: ButtonProps;
};

const Upload = (props: UploadProps) => {
  console.log('Are you ok!');

  const { buttonProps, ...restProps } = props;

  return;
  <Button {...buttonProps}></Button>;
};

export { Upload };
