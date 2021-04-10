import { Link, matchRoutes, useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { BASE_NAME, getBreadcrumbs, getRouters } from '@admin/routers';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, Text } from '@chakra-ui/react';
import { Home } from '@icon-park/react';

const HeaderBreadcrumb = ({ height }: { height: string }) => {
  const location = useLocation();

  const routes = useMemo(() => {
    return getRouters();
  }, []);

  const breadcrumbs = useMemo(() => {
    return getBreadcrumbs();
  }, []);

  useEffect(() => {
    const match = matchRoutes(routes, location, BASE_NAME);

    console.log(match);

    if (match) {
      const [, ...rest] = match;

      const matchUrl = rest?.reduce<string[]>((url, item) => {
        url.push(item.route.path);

        return url;
      }, []);

      console.log(matchUrl.join('/'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <Breadcrumb paddingStart="3" height={height} lineHeight={height}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to={'home'}>
          <Icon verticalAlign="-2px" as={Home}></Icon> 管理后台
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isLastChild>
        <Text color="gray.600">首页</Text>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export { HeaderBreadcrumb };
