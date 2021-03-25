import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import { setAuthAccessToken } from '@admin/AppAuth';
import { refreshAuth } from '@admin/services/useAuth';
import { useAuthPermission } from '@admin/hooks/useAuthPermission';
import ContentLayout from '@admin/layouts/ContentLayout';
import { requestFlatry } from '@shared/utils/http';
import { useHttp } from '@shared/contexts/HttpContext';
import { useState } from 'react';
import { timeout } from '@shared/utils/util';
import { Button } from '@shared/components/button/Button';
import { Link } from 'react-router-dom';

const DeleteUserButton = () => {
  const canDeleteUser = useAuthPermission('user/delete');

  return <Button isDisabled={!canDeleteUser}>是否有删除用户权限</Button>;
};

const DeleteAdminButton = () => {
  const canDeleteAdmin = useAuthPermission('admin/delete');

  return <Button isDisabled={!canDeleteAdmin}>是否有删除管理员权限</Button>;
};

const RefreshUserButton = () => {
  const [loading, setLoading] = useState(false);

  const handleRefreshUser = async () => {
    setLoading(true);
    await refreshAuth();
    await timeout(500);
    await setLoading(false);
  };

  return (
    <Button isLoading={loading} onClick={handleRefreshUser}>
      重新获取用户
    </Button>
  );
};

const Home = () => {
  const { setError } = useErrorDispatch();
  const { get, post } = useHttp();

  const handleClick = () => {
    setError('No handler found for GET /admin-api/shop-products');
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
      <div>
        <div>Hello Agile</div>
        <div>中文字体</div>
        <div>
          <Button isFullWidth onClick={handleToastShow}>
            显示一个 Toast
          </Button>
          &nbsp;
          <Button as={Link} isDisabled to={'about'}>
            显示一个 Toast
          </Button>
        </div>
        <div>
          <DeleteUserButton />
          &nbsp;&nbsp;
          <DeleteAdminButton />
        </div>
        <div>
          <button onClick={handleSendGet}>随便发送一个 GET 请求</button>
          &nbsp;&nbsp;
          <button onClick={handleSendPost}>随便发送一个 POST 请求</button>
        </div>
        <div>
          <RefreshUserButton />
        </div>
        <div>
          <button onClick={handleSetIncorrectAccessToken}>设置错误的 AccessToken</button>
          &nbsp;&nbsp;
          <button onClick={handleSetCorrectAccessToken}>设置正确的 AccessToken</button>
        </div>
        <div>
          <button onClick={handleClick}>显示个错误提示</button>
          <button onClick={handleClick}>显示个错误提示</button>
          <button onClick={handleClick}>显示个错误提示</button>
          <button onClick={handleClick}>显示个错误提示</button>
        </div>
        <div>
          <button onClick={handleClick}>显示个错误提示</button>
          <button onClick={handleClick}>显示个错误提示</button>
          <button onClick={handleClick}>显示个错误提示</button>
          <button onClick={handleClick}>显示个错误提示</button>
        </div>
        <div>
          <button onClick={handleClick}>显示个错误提示</button>
          &nbsp;&nbsp;
          <button onClick={handleClick}>显示个错误提示</button>
          &nbsp;&nbsp;
          <button onClick={handleClick}>显示个错误提示</button>
          &nbsp;&nbsp;
          <button onClick={handleClick}>显示个错误提示</button>
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
      </div>
    </ContentLayout>
  );
};

export default Home;
