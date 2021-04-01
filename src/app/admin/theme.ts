import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

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
    sm: '0.875rem',
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
    Button: {
      defaultProps: {
        colorScheme: 'blue',
      },
      baseStyle: {
        fontWeight: 'medium',
        lineHeight: 'base',
      },
      sizes: {
        sm: {
          height: 9,
          minWidth: 9,
        },
        xs: {
          height: 8,
          fontSize: 'base',
          paddingStart: 3,
          paddingEnd: 3,
          minWidth: 8,
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
        },
      },
    },
    FormError: {
      baseStyle: {
        text: {
          fontSize: 'xs',
        },
      },
    },
  },
});

export default agileTheme;
