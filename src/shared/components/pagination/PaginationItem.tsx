import { chakra, forwardRef } from '@chakra-ui/react';
import { PaginationItemProps } from '@shared/components/pagination/usePagination';

const PaginationItem = forwardRef<PaginationItemProps, 'button'>((props, ref) => {
  const { page, type, isSelected, isDisabled, ...restProps } = props;

  return (
    <chakra.button
      fontWeight={'medium'}
      display={'block'}
      cursor={isSelected ? 'default' : 'pointer'}
      color={isSelected ? 'white' : 'gray.900'}
      backgroundColor={isSelected ? 'blue.500' : 'gray.100'}
      disabled={isDisabled}
      marginX={1.5}
      lineHeight={6}
      height={7}
      minW={6}
      paddingX={3}
      borderRadius={'sm'}
      textAlign={'center'}
      _disabled={{
        color: 'gray.300',
      }}
      ref={ref}
      {...restProps}
    >
      {type == 'previous'
        ? '<'
        : type == 'next'
        ? '>'
        : type == 'end-ellipsis' || type == 'start-ellipsis'
        ? '...'
        : page}
    </chakra.button>
  );
});

export { PaginationItem };
