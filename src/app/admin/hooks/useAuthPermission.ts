import { deepSearch, formatUrl } from '@shared/utils/util';
import useAuth from '@admin/services/useAuth';
import { useMemo } from 'react';

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

const isRouteInMenus = (route: string, menus: string[]) => {
  const path = route.startsWith('/') ? route.substr(1) : route;

  return menus.map((menu) => formatUrl(menu)).includes(path);
};

export const useAuthPermission = (route: string): boolean => {
  const { authUser } = useAuth();

  if (authUser && authUser.groupPermissions && authUser.groupPermissions.length > 0) {
    return isRouteInPermissions(route, authUser.groupPermissions);
  }

  return false;
};

export const useRouteInMenus = (route: string): boolean => {
  const { authUser } = useAuth();

  const menuUrls = useMemo<string[]>(() => {
    if (authUser && authUser.groupMenus && authUser.groupMenus.length > 0) {
      return deepSearch('url', authUser.groupMenus);
    }

    return [];
  }, [authUser]);

  if (menuUrls.length > 0) {
    return isRouteInMenus(route, menuUrls);
  }

  return false;
};

export default useAuthPermission;
