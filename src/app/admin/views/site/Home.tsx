import { useEffect, VFC } from 'react';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import { Button } from '@material-ui/core';
import { useAccountLazy } from '@admin/services/useAccount';
import { useAuthUserDispatch } from '@admin/contexts/AuthUserContext';

const Home: VFC = () => {
  const { setError } = useErrorDispatch();

  const { data, execute } = useAccountLazy();

  const setAuthUser = useAuthUserDispatch();

  useEffect(() => {
    if (data) {
      setAuthUser(data.currentUser, data.groupMenus, data.groupPermissions);
    }
  }, [data, setAuthUser]);

  const handleClick = () => {
    setError('No handler found for GET /admin-api/shop-products', false);
  };

  const refreshUser = () => {
    execute();
  };

  console.log('Home Render');

  return (
    <div className={'ag-box'}>
      <p>Hello Agile</p>
      <p>
        <Button onClick={handleClick}>错误关闭</Button>
      </p>
      <p>
        <Button onClick={refreshUser}>重新获取用户</Button>
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
