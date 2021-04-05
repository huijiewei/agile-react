import { chakra, forwardRef, omitThemingProps } from '@chakra-ui/system';
import { PaginationRenderItemParams } from './Pagination';

const PaginationItem = forwardRef<PaginationRenderItemParams, 'div'>((props, ref) => {
  const ownProps = omitThemingProps(props);

  const { page, ...restProps } = ownProps;

  return (
    <chakra.span ref={ref} {...restProps}>
      {page}
    </chakra.span>
  );
});

export { PaginationItem };
