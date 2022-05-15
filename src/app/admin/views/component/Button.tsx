import { Button, HStack, IconButton, Stack, useToast } from '@chakra-ui/react';
import { Config, Delete, Minus } from '@icon-park/react';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';

const ComponentButton = (): JSX.Element => {
  const { setError } = useErrorDispatch();
  const toast = useToast();

  const onClickButton = () => {
    setError('错误提示');
  };

  const onClickShowToast = () => {
    toast({
      title: '提示',
      description: '这是一个提示',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Stack>
      <HStack>
        <Button onClick={onClickButton} leftIcon={<Delete />} variant="outline">
          图标按钮
        </Button>
        <Button onClick={onClickShowToast} leftIcon={<Config />}>
          图标按钮
        </Button>
        <Button iconSpacing="2" leftIcon={<Config />} variant="outline" size={'sm'}>
          图标按钮
        </Button>
        <Button iconSpacing="2" leftIcon={<Config />} size={'sm'}>
          图标按钮
        </Button>
        <Button iconSpacing={1.5} leftIcon={<Delete />} variant="outline" size={'xs'}>
          图标按钮
        </Button>
        <Button iconSpacing={1.5} leftIcon={<Minus />} size={'xs'}>
          图标按钮2
        </Button>
      </HStack>
      <HStack>
        <IconButton aria-label="" variant="outline" icon={<Config />} />
        <IconButton aria-label="" icon={<Delete />} />
        <IconButton aria-label="" variant="outline" icon={<Delete />} size={'sm'} />
        <IconButton aria-label="" icon={<Config />} size={'sm'} />
        <IconButton aria-label="" variant="outline" icon={<Minus />} size={'xs'} />
        <IconButton aria-label="" icon={<Config />} size={'xs'} />
      </HStack>
    </Stack>
  );
};

export default ComponentButton;
