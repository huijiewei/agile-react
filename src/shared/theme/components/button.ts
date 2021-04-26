import { mode } from '@chakra-ui/theme-tools';
import { Dict } from '@shared/utils/types';

const buttonTheme = {
  defaultProps: {
    colorScheme: 'blue',
  },
  baseStyle: {
    fontWeight: 'medium',
    lineHeight: 'normal',
  },
  variants: {
    link: (props: Dict): Dict => ({
      _hover: {
        color: mode(`${props.colorScheme}.600`, `${props.colorScheme}.400`)(props),
        textDecoration: 'none',
      },
    }),
  },
  sizes: {
    lg: {
      h: 10,
      minW: 10,
    },
    md: {
      h: 9,
      minW: 9,
    },
    xs: {
      fontWeight: 'normal',
      fontSize: 'sm',
    },
  },
};

const closeButtonTheme = {
  sizes: {
    lg: {
      w: 9,
      h: 9,
      fontSize: '13px',
    },
    md: {
      w: 7,
      h: 7,
      fontSize: '11px',
    },
    sm: {
      w: 6,
      h: 6,
      fontSize: '9px',
    },
  },
};

export { buttonTheme, closeButtonTheme };
