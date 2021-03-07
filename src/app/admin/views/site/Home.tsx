import { FC, useState, VFC } from 'react';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import useRefreshUser from '@admin/hooks/useRefreshUser';
import Spinner from '@shared/components/spinner/Spinner';
import Button from '@shared/components/button/Button';
import ButtonGroup from '@shared/components/button/ButtonGroup';

const RefreshUserButton: FC = ({ children }) => {
  const refreshUser = useRefreshUser();

  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshUser = async () => {
    setIsLoading(true);

    await refreshUser();

    await new Promise((resolve) => setTimeout(resolve, 900));

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

  const handleClick = () => {
    setError('No handler found for GET /admin-api/shop-products', false);
  };

  console.log('Home Render');

  return (
    <div className={'space-y-3'} style={{ padding: '16px' }}>
      <p>Hello Agile</p>
      <p>中文字体</p>
      <p>
        <Button onClick={handleClick}>错误关闭</Button>
      </p>
      <p>
        <RefreshUserButton>重新获取用户</RefreshUserButton>
      </p>
      <p>
        <Spinner />
      </p>
      <p>
        <Button size={'sm'}>小按钮</Button>
        <Button>普通按钮</Button>
        <Button size={'lg'}>大按钮</Button>
        <Button size={'xl'}>超大按钮</Button>
      </p>
      <p>
        <Button isFullWidth={true}>全宽度按钮</Button>
      </p>
      <p>
        <Button isLoading={true}>正在加载</Button>
      </p>
      <p>
        <Button isLoading={true} loadingText={'正在加载...'}>
          正在加载
        </Button>
      </p>
      <p>
        <ButtonGroup>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </p>
      <p>
        <ButtonGroup isAttached>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </p>
      <p>
        <ButtonGroup isAttached>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </p>
      <p>
        <ButtonGroup variant={'outline'} isAttached>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </p>
      <p>
        <ButtonGroup variant={'outline'} isAttached>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </p>
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
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
    </div>
  );
};

export default Home;
