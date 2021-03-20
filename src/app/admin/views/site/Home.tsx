import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import { setAuthAccessToken } from '@admin/AppAuth';
import { refreshAuth } from '@admin/services/useAuth';
import useAuthPermission from '@admin/hooks/useAuthPermission';
import ContentLayout from '@admin/layouts/ContentLayout';
import { Box, Button, ButtonGroup } from '@material-ui/core';
import { requestFlatry } from '@shared/utils/http';
import { useHttp } from '@shared/contexts/HttpContext';

const DeleteUserButton = () => {
  const canDeleteUser = useAuthPermission('user/delete');

  return <Button disabled={!canDeleteUser}>是否有删除用户权限</Button>;
};

const DeleteAdminButton = () => {
  const canDeleteAdmin = useAuthPermission('admin/delete');

  return <Button disabled={!canDeleteAdmin}>是否有删除管理员权限</Button>;
};

const Home = () => {
  const { setError } = useErrorDispatch();
  const { get, post } = useHttp();

  const handleClick = () => {
    setError('No handler found for GET /admin-api/shop-products');
  };

  const handleRefreshUser = async () => {
    await refreshAuth();
  };

  const handleSetIncorrectAccessToken = () => {
    setAuthAccessToken('1T0VCubVALBwvgHm51Hh6o2');
  };

  const handleSetCorrectAccessToken = () => {
    setAuthAccessToken('1T0VCubVALBwvgHm51Hh6o');
  };

  const handleSendGet = async () => {
    const { data } = await requestFlatry(get('user/create', {}));

    if (data) {
      console.log(data);
    }
  };

  const handleSendPost = async () => {
    const { data } = await requestFlatry(post('user/create', {}));

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
      <Box sx={{ '& > div': { marginBottom: 1 } }}>
        <Box>Hello Agile</Box>
        <Box>中文字体</Box>
        <Box>
          <Button onClick={handleToastShow}>显示一个 Toast</Button>
        </Box>
        <Box>
          <DeleteUserButton />
          &nbsp;&nbsp;
          <DeleteAdminButton />
        </Box>
        <Box>
          <Button size={'small'} onClick={handleSendGet}>
            随便发送一个 GET 请求
          </Button>
          &nbsp;&nbsp;
          <Button size={'small'} onClick={handleSendPost}>
            随便发送一个 POST 请求
          </Button>
        </Box>
        <Box>
          <Button onClick={handleRefreshUser}>重新获取用户</Button>
        </Box>
        <Box>
          <Button onClick={handleSetIncorrectAccessToken}>设置错误的 AccessToken</Button>
          &nbsp;&nbsp;
          <Button onClick={handleSetCorrectAccessToken}>设置正确的 AccessToken</Button>
        </Box>
        <Box>
          <Button variant="outlined" size={'large'} onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;&nbsp;
          <Button variant="outlined" onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;&nbsp;
          <Button variant="outlined" size={'small'} onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;&nbsp;
          <Button variant="outlined" size={'tiny'} onClick={handleClick}>
            显示个错误提示
          </Button>
        </Box>
        <Box>
          <Button size={'large'} onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;&nbsp;
          <Button onClick={handleClick}>显示个错误提示</Button>
          &nbsp;&nbsp;
          <Button size={'small'} onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;&nbsp;
          <Button size={'tiny'} onClick={handleClick}>
            显示个错误提示
          </Button>
        </Box>
        <Box>
          <Button onClick={handleClick}>显示个错误提示</Button>
          &nbsp;&nbsp;
          <Button variant="outlined" onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;&nbsp;
          <Button variant="text" onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;&nbsp;
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
