import useRequest from '@shared/hooks/useRequest';
import { useAuthUserDispatch } from '@admin/contexts/AuthUserContext';
import { useCallback } from 'react';

const useRefreshUser = (): (() => void) => {
  const { httpGet } = useRequest();
  const setAuthUser = useAuthUserDispatch();

  return useCallback(
    async () => {
      const { data } = await httpGet('auth/account');

      if (data) {
        setAuthUser(data.currentUser, data.groupMenus, data.groupPermissions);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

export default useRefreshUser;
