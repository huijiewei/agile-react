import { deepSearch, formatUrl } from '@shared/utils/util';
import useAuth from '@admin/services/useAuth';
import { useEffect, useMemo, useState } from 'react';

const isRouteInMenus = (route: string, menus: string[]) => {
  const path = route.startsWith('/') ? route.substr(1) : route;

  return menus.map((menu) => formatUrl(menu)).includes(path);
};

export const useAuthMenu = (route: string): boolean => {
  const { groupMenus } = useAuth();

  const [hasMenu, setHasMenu] = useState(false);

  const menuUrls = useMemo<string[]>(() => {
    if (groupMenus.length > 0) {
      return deepSearch('url', groupMenus);
    }

    return [];
  }, [groupMenus]);

  useEffect(() => {
    setHasMenu(menuUrls.length > 0 && isRouteInMenus(route, menuUrls));
  }, [route, menuUrls]);

  return hasMenu;
};

export default useAuthMenu;
