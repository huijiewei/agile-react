import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

const ContentLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box width={'100%'} backgroundColor={'white'} padding={'16px'}>
      {children}
    </Box>
  );
};

export default ContentLayout;
