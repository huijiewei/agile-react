import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Suspense, useEffect, VFC } from 'react';
import { AuthLoginAction, useAuthLoginState } from '@shared/contexts/AuthLoginContext';
import useRefreshUser from '@admin/hooks/useRefreshUser';
import AgileHeader from '@admin/layouts/AgileHeader';
import AgileAside from '@admin/layouts/AgileAside';
import { Flex, Box } from '@chakra-ui/react';
import LoginModal from '@admin/components/LoginModal';
import LoginDirect from '@admin/components/LoginDirect';

const DefaultLayout: VFC = () => {
  const refreshUser = useRefreshUser();
  const authLoginAction = useAuthLoginState();

  console.log(authLoginAction);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  console.log('DefaultLayout Render');

  return authLoginAction == AuthLoginAction.DIRECT ? (
    <LoginDirect />
  ) : (
    <>
      <Flex backgroundColor={'#f4f8fb'} alignItems={'stretch'} width={'100%'}>
        <AgileHeader />
        <AgileAside />
        <Flex as={'main'} minHeight={'100vh'} width={'100vw'} marginLeft={'220px'} padding={'16px'} paddingTop={'90px'}>
          <Box padding={'16px'} width={'100%'} backgroundColor={'white'}>
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </Box>
        </Flex>
      </Flex>
      {authLoginAction == AuthLoginAction.MODAL && <LoginModal />}
    </>
  );
};

export default DefaultLayout;
