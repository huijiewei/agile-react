import { FC, useState, VFC } from 'react';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import { Button } from '@material-ui/core';
import useRefreshUser from '@admin/hooks/useRefreshUser';
import { LoadingButton } from '@material-ui/lab';

const RefreshUserButton: FC = ({ children }) => {
  const refreshUser = useRefreshUser();

  const [pending, setPending] = useState(false);

  const handleRefreshUser = async () => {
    setPending(true);

    await refreshUser();

    await new Promise((resolve) => setTimeout(resolve, 900));

    setPending(false);
  };

  return (
    <LoadingButton pending={pending} onClick={handleRefreshUser}>
      {children}
    </LoadingButton>
  );
};

const Home: VFC = () => {
  const { setError } = useErrorDispatch();

  const handleClick = () => {
    setError('No handler found for GET /admin-api/shop-products', false);
  };

  console.log('Home Render');

  return (
    <div className={'ag-box'}>
      <p>Hello Agile</p>
      <p>
        <Button onClick={handleClick}>错误关闭</Button>
      </p>
      <p>
        <RefreshUserButton>重新获取用户</RefreshUserButton>
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
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
      <p>TEST</p>
    </div>
  );
};

export default Home;
