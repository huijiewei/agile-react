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
      },
    },
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
        borderRadius: 'base',
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
          px: 5,
        },
        sm: {
          h: 7,
          minW: 7,
          fontSize: 'sm',
          px: 3,
        },
        xs: {
          h: 5,
          minW: 5,
          fontSize: 'xs',
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
    Modal: {
      parts: ['dialog'],
      baseStyle: {
        dialog: {
          borderRadius: 'base',
        },
      },
    },
  },
};

export default theme;
