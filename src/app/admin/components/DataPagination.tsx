import { PaginationItemProps, PaginationProps } from '@shared/components/pagination/usePagination';
import { Pages } from '@admin/services/types';
import { PaginationItem } from '@shared/components/pagination/PaginationItem';
import { Link, useLocation } from 'react-router-dom';
import { Pagination } from '@shared/components/pagination/Pagination';
import { Location, To } from 'history';
import queryString from 'query-string';

type DataPaginationProps = Omit<PaginationProps, 'total' | 'currentPage' | 'renderPage'> & {
  pages?: Pages | null;
};

type DataPaginationItemProps = PaginationItemProps & { location: Location };

const DataPaginationItem = (props: DataPaginationItemProps) => {
  const { location, page, ...restProps } = props;

  const search = queryString.stringify({ ...queryString.parse(location.search), page: page > 1 ? page : undefined });

  const to: To = {
    pathname: location.pathname,
    search: search == '' ? '' : '?' + search,
    hash: location.hash,
  };

  return <PaginationItem as={Link} to={to} page={page} {...restProps} />;
};

const DataPagination = (props: DataPaginationProps): JSX.Element => {
  const { pages, ...restProps } = props;

  const location = useLocation();

  return (
    <>
      {pages && (
        <Pagination
          showTotal
          marginTop={5}
          {...restProps}
          total={pages.totalCount}
          currentPage={pages.currentPage}
          renderPage={(page) => <DataPaginationItem location={location} {...page} />}
        />
      )}
    </>
  );
};

export { DataPagination };
