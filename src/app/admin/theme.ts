import { createMuiTheme } from '@material-ui/core';
import { zhCN } from '@material-ui/core/locale';

declare module '@material-ui/core/Button/Button' {
  interface ButtonPropsSizeOverrides {
    tiny: true;
  }
}

const agileTheme = createMuiTheme(
  {
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      body1: {
        fontSize: '0.875rem',
      },
    },
    palette: {
      primary: {
        light: '#90CDF4',
        main: '#3182CE',
        dark: '#2B6CB0',
        contrastText: '#FFFFFF',
      },
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          variant: 'contained',
        },
        variants: [
          {
            props: { size: 'tiny' },
            style: {
              minWidth: 36,
              fontSize: '0.75rem',
              padding: '1px 6px',
            },
          },
        ],
      },
      MuiButtonGroup: {
        defaultProps: {
          disableRipple: true,
          disableElevation: true,
          variant: 'contained',
        },
      },
    },
  },
  zhCN
);

export default agileTheme;
