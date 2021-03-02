import { useAuthUserDispatch } from '@admin/contexts/AuthUserContext';
import { useEffect } from 'react';
import useAccount from '@admin/services/useAccount';

const useRefreshAuthUser = (): void => {
  const setAuthUser = useAuthUserDispatch();

  const { data } = useAccount();

  useEffect(() => {
    if (data) {
      setAuthUser(data.currentUser, data.groupMenus, data.groupPermissions);
    }
  }, [data, setAuthUser]);
};

export default useRefreshAuthUser;