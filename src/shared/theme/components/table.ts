import { mode } from '@chakra-ui/theme-tools';
import { Dict } from '@shared/utils/types';

const tableTheme = {
  baseStyle: {
    fontWeight: 'medium',
  },
  variants: {
    simple: (props: Dict): Dict => ({
      th: {
        color: mode(`gray.400`, `gray.200`)(props),
      },
    }),
    striped: (props: Dict): Dict => ({
      th: {
        color: mode(`gray.400`, `gray.200`)(props),
      },
    }),
  },
  sizes: {
    sm: {
      th: {
        px: '3',
        py: '1',
        lineHeight: '3',
        fontSize: 'sm',
      },
      td: {
        px: '3',
        py: '2',
        fontSize: 'sm',
        lineHeight: '3',
      },
      caption: {
        px: '3',
        py: '2',
        fontSize: 'sm',
      },
    },
    md: {
      th: {
        px: '3',
        py: '2',
        lineHeight: 'base',
        fontSize: 'md',
      },
      td: {
        px: '3',
        py: '3',
        lineHeight: 'base',
      },
      caption: {
        px: '3',
        py: '3',
        fontSize: 'md',
      },
    },
    lg: {
      th: {
        px: '7',
        py: '4',
        lineHeight: 'base',
      },
      td: {
        px: '7',
        py: '5',
        lineHeight: 'base',
      },
      caption: {
        px: '5',
        py: '2',
      },
    },
  },
};

export { tableTheme };
