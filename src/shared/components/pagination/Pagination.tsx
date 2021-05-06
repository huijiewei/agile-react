import { chakra } from '@chakra-ui/react';
import { cx } from '@chakra-ui/utils';
import { PaginationItemProps, PaginationProps, usePagination } from './usePagination';
import { PaginationItem } from './PaginationItem';

const Pagination = (props: PaginationProps): JSX.Element => {
  const { pages, ...ownProps } = usePagination(props);

  const {
    className,
    renderPage = (page: PaginationItemProps) => <PaginationItem {...page} />,
    showTotal = false,
    ...restProps
  } = ownProps;

  const _className = cx('chakra-pagination', className);

  return (
    <chakra.nav
      fontSize={'sm'}
      display={'flex'}
      aria-label="pagination navigation"
      className={_className}
      {...restProps}
    >
      {showTotal && (
        <chakra.span marginEnd={3} lineHeight={7} height={7}>
          共 {props.total} 条
        </chakra.span>
      )}
      <chakra.ul listStyleType={'none'} className="chakra-pagination__list">
        {pages.map((page, index) => (
          <chakra.li
            _first={{ marginInlineStart: 0 }}
            _last={{ marginInlineEnd: 0 }}
            marginX={1}
            display={'inline-block'}
            className="chakra-pagination__item"
            key={index}
          >
            {renderPage(page)}
          </chakra.li>
        ))}
      </chakra.ul>
    </chakra.nav>
  );
};

export { Pagination };
