import { FC, useState, VFC } from 'react';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import useRefreshUser from '@admin/hooks/useRefreshUser';
import { Box, Button, Stack } from '@chakra-ui/react';
import useRequest from '@shared/hooks/useRequest';
import { flatry } from '@shared/utils/util';
import { useAuthUserDispatch } from '@admin/contexts/AuthUserContext';
import { useAuthToken } from '@admin/AppAuthProvider';

const RefreshUserButton: FC = ({ children }) => {
  const refreshUser = useRefreshUser();

  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshUser = async () => {
    setIsLoading(true);

    await refreshUser();

    setIsLoading(false);
  };

  return (
    <Button isLoading={isLoading} onClick={handleRefreshUser}>
      {children}
    </Button>
  );
};

const Home: VFC = () => {
  const { setError } = useErrorDispatch();
  const { setAccessToken } = useAuthToken();
  const { httpPost } = useRequest();
  const { setAuthUser } = useAuthUserDispatch();

  const handleClick = () => {
    setError('No handler found for GET /admin-api/shop-products');
  };

  const handleSetIncorrectAccessToken = () => {
    setAccessToken('1T0VCubVALBwvgHm51Hh6o2');
  };

  const handleSetCorrectAccessToken = () => {
    setAccessToken('1T0VCubVALBwvgHm51Hh6o');
  };

  const handleSendPost = async () => {
    const { data } = await flatry(httpPost('user/create', {}));
  };

  const handleLogin = async () => {
    const { data } = await flatry(httpPost('auth/login', { account: '13012345678', password: 'soarman' }));

    if (data) {
      setAccessToken(data.accessToken);
      setAuthUser(data.currentUser, data.groupMenus, data.groupPermissions);
    }

    console.log(data);
  };

  console.log('Home Render');

  return (
    <Stack direction={'column'} spacing={3} padding={'16px'}>
      <Box>Hello Agile</Box>
      <Box>中文字体</Box>
      <Box>
        <Button onClick={handleClick}>错误关闭</Button>
      </Box>
      <Box>
        <RefreshUserButton>重新获取用户</RefreshUserButton>
      </Box>
      <Box>
        <Button onClick={handleSetIncorrectAccessToken}>设置错误的 AccessToken</Button>
      </Box>
      <Box>
        <Button onClick={handleSetCorrectAccessToken}>设置正确的 AccessToken</Button>
      </Box>
      <Box>
        <Button onClick={handleSendPost}>随便发送一个请求</Button>
      </Box>
      <Box>
        <Button onClick={handleLogin}>测试登录接口</Button>
      </Box>
      <Box>TEST</Box>
      <div>TEST</div>
      <div className="w-full flex flex-row justify-between">
        <p>BEGIN</p>
        <p>END</p>
      </div>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
    </Stack>
  );
};

export default Home;
