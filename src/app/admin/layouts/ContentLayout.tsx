import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

const ContentLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box backgroundColor="white" padding="5">
      {children}
    </Box>
  );
};

export default ContentLayout;
