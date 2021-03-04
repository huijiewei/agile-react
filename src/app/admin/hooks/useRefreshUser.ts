import useRequest from '@shared/hooks/useRequest';
import { useAuthUserDispatch } from '@admin/contexts/AuthUserContext';
import { useCallback } from 'react';

const useRefreshUser = (): (() => void) => {
  const { httpGet } = useRequest();
  const setAuthUser = useAuthUserDispatch();

  return useCallback(() => {
    httpGet('auth/account').then(({ data }) => {
      setAuthUser(data.currentUser, data.groupMenus, data.groupPermissions);
    });
  }, [httpGet, setAuthUser]);
};

export default useRefreshUser;
