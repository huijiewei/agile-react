import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import AgileHeader from '@admin/layouts/AgileHeader';
import AgileAside from '@admin/layouts/AgileAside';
import AuthLogin from '@admin/components/AuthLogin';
import { Box, Container } from '@material-ui/core';

const DefaultLayout = () => {
  console.log('DefaultLayout Render');

  return (
    <AuthLogin>
      <Container maxWidth={false} disableGutters>
        <AgileHeader />
        <AgileAside />
        <Box sx={{ marginLeft: 25 }}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </Box>
      </Container>
    </AuthLogin>
  );
};

export default DefaultLayout;
