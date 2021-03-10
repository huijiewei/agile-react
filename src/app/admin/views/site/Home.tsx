import { FC, useState, VFC } from 'react';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import useRefreshUser from '@admin/hooks/useRefreshUser';
import Spinner from '@shared/components/spinner/Spinner';
import Button from '@shared/components/button/Button';

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
    <div className={'space-y-3'}>
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
      <div>TEST</div>
      <div>TEST</div>
      <p className="w-full flex flex-row justify-between">
        <p>BEGIN</p>
        <p>END</p>
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
    </div>
  );
};

export default Home;
