import { Box, BoxProps, Heading, HeadingProps } from '@chakra-ui/react';

const CardHeader = (props: HeadingProps): JSX.Element => {
  const { children, ...restProps } = props;

  return (
    <Heading
      borderBottomColor={'gray.200'}
      borderBottomWidth={'1px'}
      backgroundColor={'gray.50'}
      padding={3}
      size={'sm'}
      as={'h2'}
      {...restProps}
    >
      {children}
    </Heading>
  );
};

const CardBody = (props: BoxProps): JSX.Element => {
  const { children, ...restProps } = props;

  return (
    <Box padding={3} {...restProps}>
      {children}
    </Box>
  );
};

const Card = (props: BoxProps): JSX.Element => {
  const { children, ...restProps } = props;

  return (
    <Box shadow={'sm'} borderWidth={'1px'} borderColor={'gray.200'} borderRadius={'md'} {...restProps}>
      {children}
    </Box>
  );
};

export { Card, CardHeader, CardBody };
