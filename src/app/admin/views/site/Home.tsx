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
      <div>Hello Agile</div>
      <div>中文字体</div>
      <div>
        <Button onClick={handleClick}>错误关闭</Button>
      </div>
      <div>
        <RefreshUserButton>重新获取用户</RefreshUserButton>
      </div>
      <div>
        <Spinner />
      </div>
      <div>
        <Button size={'sm'}>小按钮</Button>
        <Button>普通按钮</Button>
        <Button size={'lg'}>大按钮</Button>
        <Button size={'xl'}>超大按钮</Button>
      </div>
      <div>
        <Button isFullWidth={true}>全宽度按钮</Button>
      </div>
      <div>
        <Button isLoading={true}>正在加载</Button>
      </div>
      <div>
        <Button isLoading={true} variant={'outline'}>
          正在加载
        </Button>
      </div>
      <div>
        <Button>按钮</Button>
        &nbsp;
        <Button variant={'ghost'}>按钮</Button>
        &nbsp;
        <Button variant={'outline'}>按钮</Button>
        &nbsp;
        <Button variant={'link'}>按钮</Button>
      </div>
      <div>
        <Button>按钮</Button>
        &nbsp;
        <Button variant={'outline'}>按钮</Button>
        &nbsp;
        <Button variant={'link'}>按钮</Button>
        &nbsp;
        <Button variant={'ghost'}>按钮</Button>
      </div>
      <div>
        <Button isDisabled>按钮</Button>
        &nbsp;
        <Button isDisabled variant={'outline'}>
          按钮
        </Button>
        &nbsp;
        <Button isDisabled variant={'link'}>
          按钮
        </Button>
        &nbsp;
        <Button isDisabled variant={'ghost'}>
          按钮
        </Button>
      </div>
      <div>
        <Button isLoading={true} loadingText={'正在加载...'}>
          正在加载
        </Button>
      </div>
      <div>
        <ButtonGroup>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup isAttached>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup isAttached>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup isAttached>
          <Button>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup isAttached>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup variant={'outline'} isAttached>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup variant={'outline'} isAttached>
          <Button variant={'solid'}>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup colorScheme={'gray'} variant={'outline'} isAttached>
          <Button variant={'solid'}>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup colorScheme={'gray'} isAttached>
          <Button variant={'solid'}>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup size={'sm'} colorScheme={'gray'} isAttached>
          <Button variant={'solid'}>测试</Button>
          <Button>测试</Button>
          <Button>测试</Button>
        </ButtonGroup>
      </div>
      <div>TEST</div>
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
      <p>TEST</p>
    </div>
  );
};

export default Home;
