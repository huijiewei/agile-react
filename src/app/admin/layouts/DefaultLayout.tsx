import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Suspense, useEffect, VFC } from 'react';
import { AuthLoginAction, useAuthLoginState } from '@shared/contexts/AuthLoginContext';
import useRefreshUser from '@admin/hooks/useRefreshUser';
import AgileHeader from '@admin/layouts/AgileHeader';
import AgileAside from '@admin/layouts/AgileAside';
import { Flex } from '@chakra-ui/react';
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
      <Flex alignItems={'stretch'} width={'100%'}>
        <AgileAside />
        <Flex direction={'column'}>
          <AgileHeader />
          <Flex as={'main'} minHeight={'100vh'} marginLeft={'220px'}>
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </Flex>
        </Flex>
      </Flex>
      {authLoginAction == AuthLoginAction.MODAL && <LoginModal />}
    </>
  );
};

export default DefaultLayout;
