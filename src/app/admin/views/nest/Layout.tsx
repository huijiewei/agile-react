import ContentLayout from '@admin/layouts/ContentLayout';
import { Link, Outlet } from 'react-router-dom';
import { Box } from '@material-ui/core';

const NestLayout = () => {
  return (
    <ContentLayout>
      <Box>
        <Link to={'../nest'}>Nest</Link>
        &nbsp;&nbsp;
        <Link to={'1'}>Nest-1</Link>
        &nbsp;&nbsp;
        <Link to={'2'}>Nest-2</Link>
      </Box>
      <Outlet />
    </ContentLayout>
  );
};

export default NestLayout;
