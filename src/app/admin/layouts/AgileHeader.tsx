import { VFC } from 'react';
import { Box } from '@chakra-ui/react';

const AgileHeader: VFC = () => {
  return (
    <Box as={'header'} position={'fixed'}>
      <div className="ag-header-nav flex flex-row justify-between">
        <p>BEGIN</p>
        <p>END</p>
      </div>
      <div className="ag-header-tab flex flex-row justify-between">
        <p>BEGIN</p>
        <p>END</p>
      </div>
    </Box>
  );
};

export default AgileHeader;
