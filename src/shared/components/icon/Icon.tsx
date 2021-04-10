import { forwardRef, Icon as ChakraIcon, IconProps } from '@chakra-ui/react';

const Icon = forwardRef<IconProps, 'svg'>((props, ref) => {
  return <ChakraIcon verticalAlign="middle" {...props} ref={ref} />;
});

export { Icon };
