import { Stack, StackProps, forwardRef, HTMLChakraProps } from '@chakra-ui/react';

type FormProps = HTMLChakraProps<'form'> & StackProps;

const Form = forwardRef<FormProps, 'form'>((props, ref) => {
  const { children, spacing = 6, noValidate = true, ...restProps } = props;

  return (
    <Stack as={'form'} spacing={spacing} noValidate={noValidate} ref={ref} {...restProps}>
      {children}
    </Stack>
  );
});

export { Form };
