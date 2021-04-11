import { chakra, forwardRef } from '@chakra-ui/react';
import { __DEV__, cx } from '@chakra-ui/utils';
import { PaginationItemProps, PaginationProps, usePagination } from './usePagination';
import { PaginationItem } from './PaginationItem';

const Pagination = forwardRef<PaginationProps, 'nav'>((props, ref) => {
  const { pages, ...ownProps } = usePagination(props);

  const {
    className,
    renderPage = (page: PaginationItemProps) => <PaginationItem {...page} />,
    ...restProps
  } = ownProps;

  const _className = cx('chakra-pagination', className);

  return (
    <chakra.nav ref={ref} aria-label="pagination navigation" className={_className} {...restProps}>
      <chakra.ul className="chakra-pagination__list">
        {pages.map((page, index) => (
          <chakra.li display={'inline-block'} className="chakra-pagination__item" key={index}>
            {renderPage(page)}
          </chakra.li>
        ))}
      </chakra.ul>
    </chakra.nav>
  );
});

if (__DEV__) {
  Pagination.displayName = 'Pagination';
}

export { Pagination };
