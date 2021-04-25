import { useBreadcrumb } from '@admin/routers';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbProps, Text } from '@chakra-ui/react';
import { Icon } from '@shared/components/icon/Icon';
import { Home, Right } from '@icon-park/react';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const NavBreadcrumb = (props: BreadcrumbProps): JSX.Element => {
  const breadcrumbs = useBreadcrumb();

  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title =
      breadcrumbs
        .slice()
        .reverse()
        .map((breadcrumb) => {
          return breadcrumb.title;
        })
        .join(' - ') +
      ' - ' +
      defaultTitle.current;
  }, [breadcrumbs]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      document.title = defaultTitle.current;
    };
  }, []);

  return (
    <Breadcrumb spacing={2} separator={<Icon verticalAlign="-3px" as={Right} />} paddingStart={3} {...props}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to={'home'}>
          <Icon verticalAlign="-2px" as={Home} /> 管理后台
        </BreadcrumbLink>
      </BreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => (
        <BreadcrumbItem key={'ab-' + index} isCurrentPage={breadcrumb.current}>
          {breadcrumb.to ? (
            <BreadcrumbLink as={Link} to={breadcrumb.to}>
              {breadcrumb.title}
            </BreadcrumbLink>
          ) : (
            <Text as={'span'} color="gray.500">
              {breadcrumb.title}
            </Text>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export { NavBreadcrumb };
