import { Box } from '@material-ui/core';
import { ReactNode } from 'react';

const ContentLayout = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

export default ContentLayout;
