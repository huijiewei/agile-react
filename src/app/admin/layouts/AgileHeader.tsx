import { Box } from '@material-ui/core';
import HeaderUserMenu from '@admin/components/HeaderUserMenu';
import HeaderBreadcrumb from '@admin/components/HeaderBreadcrumb';

const AgileHeader = () => {
  return (
    <Box>
      <Box>
        <HeaderBreadcrumb float={'left'} />
      </Box>
      <Box>
        <HeaderUserMenu />
      </Box>
    </Box>
  );
};

export default AgileHeader;
