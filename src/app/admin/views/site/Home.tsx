import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import useRequest, { requestFlatry } from '@shared/hooks/useRequest';
import { useAuthToken } from '@admin/AppAuth';
import { refreshAuthUser } from '@admin/services/useAuthUser';
import useAuthPermission from '@admin/hooks/useAuthPermission';
import ContentLayout from '@admin/layouts/ContentLayout';
import { Button, ButtonGroup, Box } from '@material-ui/core';

const Home = () => {
  const { setError } = useErrorDispatch();
  const { setAccessToken } = useAuthToken();
  const { httpPost } = useRequest();
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
    const { data } = await requestFlatry(httpPost('user/create', {}));

    if (data) {
      console.log(data);
    }
  };

  const handleToastShow = () => {
    console.log(1);
  };

  console.log('Home Render');

  return (
    <ContentLayout>
      <Box sx={{ marginBottom: 2 }}>
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
          <Button variant="outlined" size={'large'} onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;
          <Button variant="outlined" onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;
          <Button variant="outlined" size={'small'} onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;
          <Button variant="outlined" size={'tiny'} onClick={handleClick}>
            显示个错误提示
          </Button>
        </Box>
        <Box>
          <Button size={'large'} onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;
          <Button onClick={handleClick}>显示个错误提示</Button>
          &nbsp;
          <Button size={'small'} onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;
          <Button size={'tiny'} onClick={handleClick}>
            显示个错误提示
          </Button>
        </Box>
        <Box>
          <Button onClick={handleClick}>显示个错误提示</Button>
          &nbsp;
          <Button variant="outlined" onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;
          <Button variant="text" onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;
          <Button onClick={handleClick}>显示个错误提示</Button>
        </Box>
        <div>
          <ButtonGroup variant="outlined" size={'small'}>
            <Button>是</Button>
            <Button>否</Button>
          </ButtonGroup>
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
      </Box>
    </ContentLayout>
  );
};

export default Home;
