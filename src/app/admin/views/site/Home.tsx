import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import { Box, Stack, useToast } from '@chakra-ui/react';
import useRequest from '@shared/hooks/useRequest';
import { flatry } from '@shared/utils/util';
import { useAuthToken } from '@admin/AppAuth';
import { refreshAuthUser } from '@admin/services/useAuthUser';
import useAuthPermission from '@admin/hooks/useAuthPermission';
import ContentLayout from '@admin/layouts/ContentLayout';
import { Button } from '@material-ui/core';

const Home = () => {
  const { setError } = useErrorDispatch();
  const { setAccessToken } = useAuthToken();
  const { httpPost } = useRequest();
  const toast = useToast();
  const canDeleteAdmin = useAuthPermission('admin/delete');
  const canDeleteUser = useAuthPermission('user/delete');

  const handleClick = () => {
    setError('No handler found for GET /admin-api/shop-products');
  };

  const handleRefreshUser = async () => {
    await refreshAuthUser();
  };

  const handleSetIncorrectAccessToken = () => {
    setAccessToken('1T0VCubVALBwvgHm51Hh6o2');
  };

  const handleSetCorrectAccessToken = () => {
    setAccessToken('1T0VCubVALBwvgHm51Hh6o');
  };

  const handleSendPost = async () => {
    const { data } = await flatry(httpPost('user/create', {}));

    if (data) {
      console.log(data);
    }
  };

  const handleToastShow = () => {
    toast({
      description: '退出登录成功',
      status: 'success',
      isClosable: true,
      variant: 'subtle',
      position: 'top',
      duration: null,
    });
  };

  console.log('Home Render');

  return (
    <ContentLayout>
      <Stack spacing={3}>
        <Box>Hello Agile</Box>
        <Box>中文字体</Box>
        <Box>
          <Button onClick={handleToastShow}>显示一个 Toast</Button>
        </Box>
        <Box>
          <Button disabled={!canDeleteUser}>是否有删除用户权限</Button>
        </Box>
        <Box>
          <Button disabled={!canDeleteAdmin}>是否有删除管理员权限</Button>
        </Box>
        <Box>
          <Button size={'small'} onClick={handleSendPost}>
            随便发送一个请求
          </Button>
        </Box>
        <Box>
          <Button onClick={handleRefreshUser}>重新获取用户</Button>
        </Box>
        <Box>
          <Button onClick={handleSetIncorrectAccessToken}>设置错误的 AccessToken</Button>
        </Box>
        <Box>
          <Button onClick={handleSetCorrectAccessToken}>设置正确的 AccessToken</Button>
        </Box>
        <Box>
          <Button variant="outlined" onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;
          <Button variant="outlined" size={'small'} onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;
          <Button variant="outlined" size={'small'} onClick={handleClick}>
            显示个错误提示
          </Button>
        </Box>
        <div>TEST</div>
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
    </ContentLayout>
  );
};

export default Home;
