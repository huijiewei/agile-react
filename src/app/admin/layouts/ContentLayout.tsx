import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

const ContentLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <Box flexGrow={1} backgroundColor="white" padding="4">
      {children}
    </Box>
  );
};

export default ContentLayout;
