const formErrorTheme = {
  baseStyle: {
    text: {
      mt: 1,
      fontSize: 'xs',
    },
  },
};

const formHorizontalLabelTheme = {
  defaultProps: {
    size: 'md',
  },
  sizes: {
    bg: {
      lineHeight: 10,
    },
    md: {
      lineHeight: 9,
    },
    sm: {
      lineHeight: 8,
    },
    xs: {
      lineHeight: 6,
    },
  },
};

export { formErrorTheme, formHorizontalLabelTheme };
