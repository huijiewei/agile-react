const theme = {
  breakpoints: {
    tablet: '640px',
    laptop: '1024px',
    desktop: '1280px',
  },
  config: {
    cssVarsPrefix: 'ag',
  },
  styles: {
    global: {
      body: {
        fontSize: 'md',
        overflowX: 'hidden',
      },
    },
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.20rem',
    md: '0.25rem',
    lg: '0.375rem',
    xl: '0.5rem',
    '2xl': '0.75rem',
    '3xl': '1rem',
    full: '9999px',
  },
  fontSizes: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '0.875rem',
    lg: '1rem',
    xl: '1.125rem',
    '2xl': '1.25rem',
    '3xl': '1.5rem',
    '4xl': '1.875rem',
    '5xl': '2.25rem',
    '6xl': '3rem',
    '7xl': '3.75rem',
    '8xl': '4.5rem',
    '9xl': '6rem',
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'blue',
      },
      baseStyle: {
        fontWeight: 'medium',
      },
      sizes: {
        lg: {
          h: 10,
          minW: 10,
          fontSize: 'lg',
          px: 7,
        },
        md: {
          h: 9,
          minW: 9,
          fontSize: 'md',
          px: 4,
        },
        sm: {
          h: '1.82rem',
          minW: 7,
          fontSize: 'sm',
          px: 3,
        },
        xs: {
          h: '1.55rem',
          minW: 6,
          fontSize: 'sm',
          px: 2,
        },
      },
      variants: {
        link: {},
      },
    },
    Menu: {
      parts: ['list'],
      baseStyle: {
        list: {
          borderRadius: 'base',
        },
      },
    },
  },
};

export default theme;
