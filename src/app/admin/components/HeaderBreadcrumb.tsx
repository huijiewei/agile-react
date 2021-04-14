import { Link } from 'react-router-dom';
import { useBreadcrumb } from '@admin/routers';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, Text } from '@chakra-ui/react';
import { Home, Right } from '@icon-park/react';

const HeaderBreadcrumb = ({ height }: { height: string }) => {
  const breadcrumbs = useBreadcrumb();

  return (
    <Breadcrumb
      spacing={2}
      separator={<Icon verticalAlign="-3px" as={Right} />}
      paddingStart="3"
      height={height}
      lineHeight={height}
    >
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

export { HeaderBreadcrumb };
