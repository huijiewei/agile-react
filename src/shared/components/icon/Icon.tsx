import { forwardRef, IconProps, Icon as ChakraIcon } from '@chakra-ui/react';

export const Icon = forwardRef<IconProps, 'svg'>((props, ref) => {
  return <ChakraIcon verticalAlign="middle" {...props} ref={ref}></ChakraIcon>;
});
