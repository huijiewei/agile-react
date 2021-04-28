import { Button, HStack, IconButton, Stack } from '@chakra-ui/react';
import { Config, Delete, Minus } from '@icon-park/react';

const ComponentButton = (): JSX.Element => {
  return (
    <Stack>
      <HStack>
        <Button leftIcon={<Delete />} variant="outline">
          图标按钮
        </Button>
        <Button leftIcon={<Config />}>图标按钮</Button>
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
