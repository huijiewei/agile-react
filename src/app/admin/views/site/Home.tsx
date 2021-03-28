import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import { setAuthAccessToken } from '@admin/AppAuth';
import { refreshAuth } from '@admin/services/useAuth';
import { useAuthPermission } from '@admin/hooks/useAuthPermission';
import ContentLayout from '@admin/layouts/ContentLayout';
import { requestFlatry } from '@shared/utils/http';
import { useHttp } from '@shared/contexts/HttpContext';
import { ReactNode, useState } from 'react';
import { timeout } from '@shared/utils/util';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

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

const MarginDiv = ({ children }: { children: ReactNode }) => {
  return <div style={{ marginBottom: '15px' }}>{children}</div>;
};

const Home = () => {
  const { setError } = useErrorDispatch();
  const { get, post } = useHttp();

  const handleClick = () => {
    setError('出现错误');
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
        <MarginDiv>Hello Agile</MarginDiv>
        <MarginDiv>中文字体</MarginDiv>
        <MarginDiv>
          <Button onClick={handleToastShow}>显示一个 Toast</Button>
          &nbsp;
          <Button as={Link} isDisabled to={'about'}>
            显示一个 Toast
          </Button>
        </MarginDiv>
        <MarginDiv>
          <DeleteUserButton />
          &nbsp;&nbsp;
          <DeleteAdminButton />
        </MarginDiv>
        <MarginDiv>
          <button onClick={handleSendGet}>随便发送一个 GET 请求</button>
          &nbsp;&nbsp;
          <button onClick={handleSendPost}>随便发送一个 POST 请求</button>
        </MarginDiv>
        <MarginDiv>
          <RefreshUserButton />
        </MarginDiv>
        <MarginDiv>
          <button onClick={handleSetIncorrectAccessToken}>设置错误的 AccessToken</button>
          &nbsp;&nbsp;
          <button onClick={handleSetCorrectAccessToken}>设置正确的 AccessToken</button>
        </MarginDiv>
        <MarginDiv>
          <Button isFullWidth onClick={handleClick}>
            显示个错误提示
          </Button>
        </MarginDiv>
        <MarginDiv>
          <Button onClick={handleClick}>显示个错误提示</Button>
          &nbsp;&nbsp;
          <Button variant={'outline'} onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;&nbsp;
          <Button variant={'ghost'} onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;&nbsp;
          <Button variant={'link'} onClick={handleClick}>
            显示个错误提示
          </Button>
        </MarginDiv>
        <MarginDiv>
          <Button size={'lg'} onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;&nbsp;
          <Button onClick={handleClick}>显示个错误提示</Button>
          &nbsp;&nbsp;
          <Button size="sm" onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;&nbsp;
          <Button size="xs" onClick={handleClick}>
            显示个错误提示
          </Button>
        </MarginDiv>
        <MarginDiv>
          <Button size={'lg'} onClick={handleClick}>
            显示个错误提示
          </Button>
          &nbsp;&nbsp;
          <Button onClick={handleClick}>显示个错误提示</Button>
          &nbsp;&nbsp;
          <Button size={'sm'} onClick={handleClick}>
            显示个错误提示
          </Button>
        </MarginDiv>
        <MarginDiv>TEST</MarginDiv>
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
