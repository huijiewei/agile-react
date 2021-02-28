import { IAccount, useAuthUserDispatch } from '@admin/contexts/AuthUserContext';
import { useGet } from '@shared/contexts/HttpContext';
import { useEffect } from 'react';

const useRefreshAuthUser = (): void => {
  const setAuthUser = useAuthUserDispatch();

  const { data } = useGet<IAccount>('auth/account', null, null, false);

  useEffect(() => {
    if (data) {
      setAuthUser(data.currentUser, data.groupMenus, data.groupPermissions);
    }
  }, [data, setAuthUser]);
};

export default useRefreshAuthUser;
