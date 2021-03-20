import useAuth from '@admin/services/useAuth';
import { useEffect, useState } from 'react';

const isRouteInPermissions = (route: string, permissions: string[]) => {
  if (route.length === 0) {
    return false;
  }

  const routeSplit = route.split('/');

  return (
    permissions.findIndex((permission) => {
      if (permission.length === 0) {
        return false;
      }

      const permissionSplit = permission.split('/');

      let matched = true;

      for (let i = permissionSplit.length - 1; i >= 0; i--) {
        if (permissionSplit[i].startsWith(':')) {
          continue;
        }

        matched = permissionSplit[i] === routeSplit[i] && matched;
      }

      return matched;
    }) > -1
  );
};

const useAuthPermission = (route: string): boolean => {
  const { groupPermissions } = useAuth();

  const [hasPermissions, setHasPermission] = useState(false);

  useEffect(() => {
    setHasPermission(groupPermissions.length > 0 && isRouteInPermissions(route, groupPermissions));
  }, [route, groupPermissions]);

  return hasPermissions;
};

export default useAuthPermission;
