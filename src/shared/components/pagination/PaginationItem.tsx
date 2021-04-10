import { chakra, forwardRef, omitThemingProps } from '@chakra-ui/system';
import { PaginationRenderItemParams } from './Pagination';

const PaginationItem = forwardRef<PaginationRenderItemParams, 'div'>((props, ref) => {
  const ownProps = omitThemingProps(props);

  const { page, isSelected, type, ...restProps } = ownProps;

  return (
    <chakra.span
      fontWeight={'medium'}
      display={'block'}
      cursor={isSelected ? 'default' : 'pointer'}
      color={isSelected ? 'white' : 'gray.900'}
      backgroundColor={isSelected ? 'blue.500' : 'gray.100'}
      marginX={1.5}
      lineHeight={6}
      height={7}
      minW={6}
      paddingX={3}
      borderRadius={'sm'}
      textAlign={'center'}
      ref={ref}
      {...restProps}
    >
      {type == 'previous' ? '<' : type == 'next' ? '>' : page}
    </chakra.span>
  );
});

export { PaginationItem };
