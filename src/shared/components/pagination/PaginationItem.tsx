import { chakra, forwardRef } from '@chakra-ui/react';
import { PaginationItemProps } from '@shared/components/pagination/usePagination';
import { Icon } from '@shared/components/icon/Icon';
import { Left, Right } from '@icon-park/react';

const PaginationItem = forwardRef<PaginationItemProps, 'button'>((props, ref) => {
  const { page, type, isSelected, isDisabled, ...restProps } = props;

  const title = type == 'previous' ? '上一页' : type == 'next' ? '下一页' : `第 ${page} 页`;

  return (
    <chakra.button
      title={title}
      fontWeight={'medium'}
      display={'block'}
      cursor={isSelected ? 'default' : 'pointer'}
      color={isSelected ? 'white' : 'gray.900'}
      backgroundColor={isSelected ? 'blue.500' : 'gray.100'}
      disabled={isDisabled}
      lineHeight={7}
      height={8}
      minWidth={8}
      paddingX={2}
      borderRadius={'sm'}
      textAlign={'center'}
      _disabled={{
        color: 'gray.300',
      }}
      ref={ref}
      {...restProps}
    >
      {type == 'previous' ? (
        <Icon verticalAlign={'-0.15em'} as={Left} />
      ) : type == 'next' ? (
        <Icon verticalAlign={'-0.15em'} as={Right} />
      ) : type == 'end-ellipsis' || type == 'start-ellipsis' ? (
        '...'
      ) : (
        page
      )}
    </chakra.button>
  );
});

export { PaginationItem };
