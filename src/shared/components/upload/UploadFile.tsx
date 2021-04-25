import { AspectRatio, Image, WrapItem } from '@chakra-ui/react';

type UploadFileProps = {
  file: string;
};

const UploadFile = (props: UploadFileProps): JSX.Element => {
  const { file, ...restProps } = props;

  const fileName = file?.split('/')?.pop()?.split('#')?.shift()?.split('?')?.shift();

  return (
    <WrapItem {...restProps}>
      <AspectRatio width={100} ratio={1}>
        <Image alt={fileName} src={file} objectFit="cover" />
      </AspectRatio>
    </WrapItem>
  );
};

export { UploadFile };
