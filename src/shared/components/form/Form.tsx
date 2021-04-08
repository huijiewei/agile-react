import { forwardRef, HTMLChakraProps } from '@chakra-ui/system';
import { Stack, StackProps } from '@chakra-ui/react';

type FormProps = HTMLChakraProps<'form'> & StackProps;

const Form = forwardRef<FormProps, 'form'>((props, ref) => {
  const { children, noValidate = true, ...restProps } = props;

  return (
    <Stack as={'form'} noValidate={noValidate} ref={ref} {...restProps}>
      {children}
    </Stack>
  );
});

export { Form };
