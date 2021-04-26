import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints, getColor, mode, transparentize } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
});

const themeSpaces = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.125rem',
  1.5: '0.25rem',
  2: '0.375rem',
  2.5: '0.5rem',
  3: '0.625rem',
  3.5: '0.75rem',
  4: '0.875rem',
  5: '1rem',
  6: '1.25rem',
  7: '1.5rem',
  8: '1.75rem',
  9: '2rem',
  10: '2.25rem',
  12: '2.5rem',
  14: '3rem',
  16: '3.5rem',
  20: '4rem',
  24: '5rem',
  28: '6rem',
  32: '7rem',
  36: '8rem',
  40: '9rem',
  44: '10rem',
  48: '11rem',
  52: '12rem',
  56: '13rem',
  60: '14rem',
  64: '15rem',
  72: '16rem',
  80: '18rem',
  96: '20rem',
};

const agileTheme = extendTheme({
  config: {
    cssVarPrefix: 'ag',
  },
  styles: {
    global: {
      body: {
        fontSize: 'md',
        overflowX: 'scroll',
        '&::-webkit-scrollbar': {
          width: '7px',
        },
        '&::-webkit-scrollbar-track': {
          width: '9px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray.400',
          borderRadius: 'sm',
        },
      },
      'a[disabled]': {
        pointerEvents: 'none',
      },
    },
  },
  breakpoints: breakpoints,
  fonts: {
    heading:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    body:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    mono: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.8125rem',
    md: '0.875rem',
    lg: '1rem',
    xl: '1.125rem',
    '2xl': '1.25rem',
    '3xl': '1.5rem',
    '4xl': '1.875rem',
    '5xl': '2.5rem',
    '6xl': '3.25rem',
    '7xl': '4rem',
    '8xl': '5rem',
    '9xl': '7rem',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    normal: 'normal',
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5715,
    tall: 1.625,
    taller: '2',
    '3': '.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '7': '1.75rem',
    '8': '2rem',
    '9': '2.25rem',
    '10': '2.5rem',
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.125rem',
    md: '0.15rem',
    lg: '0.2rem',
    xl: '0.25rem',
    '2xl': '0.375rem',
    '3xl': '0.5rem',
    full: '9999px',
  },
  space: themeSpaces,
  sizes: {
    ...themeSpaces,
    max: 'max-content',
    min: 'min-content',
    full: '100%',
    '3xs': '14rem',
    '2xs': '16rem',
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '7xl': '80rem',
    '8xl': '90rem',
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  components: {
    Alert: {
      baseStyle: {
        icon: { height: 7, width: 4 },
      },
      variants: {
        subtle: (props) => ({
          container: {
            bg: mode(
              getColor(props.theme, `${props.colorScheme}.50`, props.colorScheme),
              transparentize(`${props.colorScheme}.100`, 0.16)(props.theme)
            )(props),
          },
        }),
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          color: 'blue.500',
          textDecoration: 'none',
        },
      },
    },
    Breadcrumb: {
      baseStyle: {
        link: {
          _hover: {
            color: 'blue.500',
            textDecoration: 'none',
          },
        },
      },
    },
    Button: {
      defaultProps: {
        colorScheme: 'blue',
      },
      baseStyle: {
        fontWeight: 'medium',
        lineHeight: 'normal',
      },
      variants: {
        link: (props) => ({
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
        sm: {
          h: 8,
          minW: 8,
        },
        xs: {
          fontWeight: 'normal',
          fontSize: 'sm',
          h: 7,
          minW: 7,
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: 'lg',
        },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          minWidth: 36,
          py: 0,
        },
        item: {
          py: 0,
          height: '39px',
          lineHeight: '39px',
        },
        divider: {
          my: 0,
        },
      },
      defaultProps: {
        gutter: 6,
      },
    },
    FormError: {
      baseStyle: {
        text: {
          fontSize: 'xs',
        },
      },
    },
    NumberInput: {
      sizes: {
        lg: {
          field: {
            px: 3,
          },
          stepper: {
            fontSize: '0.6em',
            _first: {
              borderTopEndRadius: 'lg',
            },
          },
        },
        md: {
          field: {
            px: 3,
          },
          stepper: {
            fontSize: '0.55em',
            _first: {
              borderTopEndRadius: 'md',
            },
          },
        },
        sm: {
          stepper: {
            fontSize: '0.5em',
            _first: {
              borderTopEndRadius: 'sm',
            },
          },
        },
        xs: {
          root: {
            lineHeight: 'normal',
          },
          stepper: {
            fontSize: '0.375em',
            _first: {
              borderTopEndRadius: 'xs',
            },
            _last: {
              borderBottomEndRadius: 'xs',
            },
          },
        },
      },
    },
    Table: {
      baseStyle: {
        fontWeight: 'medium',
      },
      variants: {
        simple: (props) => ({
          th: {
            color: mode(`gray.400`, `gray.200`)(props),
          },
        }),
        striped: (props) => ({
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
    },
    Input: {
      sizes: {
        bg: {
          field: {
            px: 3,
          },
        },
        md: {
          field: {
            px: 3,
          },
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          paddingBottom: 0,
          lineHeight: 'base',
        },
        icon: {
          color: 'gray.400',
        },
      },
      sizes: {
        bg: {
          field: {
            px: 3,
          },
        },
        md: {
          field: {
            px: 3,
          },
        },
      },
    },
    CloseButton: {
      sizes: {
        lg: {
          w: '36px',
          h: '36px',
          fontSize: '13px',
        },
        md: {
          w: '28px',
          h: '28px',
          fontSize: '11px',
        },
        sm: {
          w: '22px',
          h: '22px',
          fontSize: '9px',
        },
      },
    },
  },
});

export { agileTheme };
