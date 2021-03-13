import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AuthLoginAction, useAuthLoginState } from '@shared/contexts/AuthLoginContext';
import AgileHeader from '@admin/layouts/AgileHeader';
import AgileAside from '@admin/layouts/AgileAside';
import { Flex } from '@chakra-ui/react';
import LoginModal from '@admin/components/LoginModal';
import LoginDirect from '@admin/components/LoginDirect';

const DefaultLayout = () => {
  const authLoginAction = useAuthLoginState();

  console.log('DefaultLayout Render');

  return authLoginAction == AuthLoginAction.DIRECT ? (
    <LoginDirect />
  ) : (
    <>
      <Flex backgroundColor={'#f4f8fb'} alignItems={'stretch'} width={'100%'}>
        <AgileHeader />
        <AgileAside />
        <Flex
          position={'relative'}
          as={'main'}
          minHeight={'101vh'}
          width={'100vw'}
          marginLeft={'220px'}
          padding={'16px'}
          paddingTop={'90px'}
        >
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </Flex>
      </Flex>
      {authLoginAction == AuthLoginAction.MODAL && <LoginModal />}
    </>
  );
};

export default DefaultLayout;
