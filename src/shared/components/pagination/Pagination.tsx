import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
} from '@chakra-ui/system';
import { __DEV__, cx } from '@chakra-ui/utils';
import { ReactNode } from 'react';
import { usePagination, UsePaginationItem, UsePaginationProps } from './usePagination';
import { PaginationItem } from './PaginationItem';

export type PaginationRenderItemParams = UsePaginationItem & ThemingProps<'Pagination'>;

type PaginationOptions = {
  renderPage?: (params: PaginationRenderItemParams) => ReactNode;
};

type PaginationProps = HTMLChakraProps<'nav'> & UsePaginationProps & PaginationOptions & ThemingProps<'Pagination'>;

const Pagination = forwardRef<PaginationProps, 'nav'>((props, ref) => {
  const styles = useMultiStyleConfig('Pagination', props);
  const ownProps = omitThemingProps(props);

  const { pages } = usePagination({ ...props });

  const { className, renderPage = (page) => <PaginationItem {...page} />, ...restProps } = ownProps;

  const _className = cx('chakra-pagination', className);

  return (
    <chakra.nav ref={ref} aria-label="pagination" className={_className} __css={styles.container} {...restProps}>
      <StylesProvider value={styles}>
        <chakra.ul className="chakra-pagination__list">
          {pages.map((page, index) => (
            <chakra.li className="chakra-pagination__item" key={index}>
              {renderPage({ ...page })}
            </chakra.li>
          ))}
        </chakra.ul>
      </StylesProvider>
    </chakra.nav>
  );
});

if (__DEV__) {
  Pagination.displayName = 'Pagination';
}

export { Pagination };
