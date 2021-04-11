import { chakra, forwardRef } from '@chakra-ui/react';
import { __DEV__, cx } from '@chakra-ui/utils';
import { PaginationItemProps, PaginationProps, usePagination } from './usePagination';
import { PaginationItem } from './PaginationItem';
import { KeyboardEvent } from 'react';

const Pagination = forwardRef<PaginationProps, 'nav'>((props, ref) => {
  const { pages, ...ownProps } = usePagination(props);

  const {
    className,
    renderPage = (page: PaginationItemProps) => <PaginationItem {...page} />,
    showTotal = false,
    showQuickJumper = false,
    ...restProps
  } = ownProps;

  const _className = cx('chakra-pagination', className);

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.target);
  };

  return (
    <chakra.nav display={'flex'} ref={ref} aria-label="pagination navigation" className={_className} {...restProps}>
      {showTotal && (
        <chakra.span marginEnd={3} lineHeight={7} height={8}>
          共 {props.total} 条
        </chakra.span>
      )}
      <chakra.ul listStyleType={'none'} className="chakra-pagination__list">
        {pages.map((page, index) => (
          <chakra.li
            _first={{ marginInlineStart: 0 }}
            _last={{ marginInlineEnd: 0 }}
            marginX={1.5}
            display={'inline-block'}
            className="chakra-pagination__item"
            key={index}
          >
            {renderPage(page)}
          </chakra.li>
        ))}
      </chakra.ul>
      {showQuickJumper && (
        <chakra.span marginStart={6} lineHeight={7} height={8}>
          前往
          <chakra.input
            marginX={2}
            borderWidth={'1px'}
            borderStyle={'solid'}
            borderColor={'gray.300'}
            contentEditable
            borderRadius={'sm'}
            type={'number'}
            width={12}
            paddingX={2}
            height={7}
            lineHeight={6}
            onKeyUp={onKeyUp}
            defaultValue={props.currentPage}
          />
          页
        </chakra.span>
      )}
    </chakra.nav>
  );
});

if (__DEV__) {
  Pagination.displayName = 'Pagination';
}

export { Pagination };
