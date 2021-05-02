import { ReactNode } from 'react';
import { Divider, Heading } from '@chakra-ui/react';

const FormHead = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <>
      <Heading paddingX={2} as={'h3'} size={'md'}>
        {children}
      </Heading>
      <Divider marginY={3} />
    </>
  );
};

export { FormHead };
