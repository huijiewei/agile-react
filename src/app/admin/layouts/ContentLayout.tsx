import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

const ContentLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <Box minHeight={'full'} backgroundColor="white" padding="5">
      {children}
    </Box>
  );
};

export default ContentLayout;
