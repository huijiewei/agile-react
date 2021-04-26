const inputTheme = {
  sizes: {
    bg: {
      field: {
        h: 10,
        px: 3,
      },
    },
    md: {
      field: {
        h: 9,
        px: 3,
      },
    },
  },
};

const numberInputTheme = {
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
};

export { inputTheme, numberInputTheme };
