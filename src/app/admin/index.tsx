import '@shared/utils/wdyr';

import { StrictMode } from 'react';
import { render } from 'react-dom';

import App from './App';

import './serviceWorker';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import { zhCN } from '@material-ui/core/locale';

const agileTheme = createMuiTheme(
  {
    typography: {
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
        styleOverrides: {
          sizeSmall: {
            lineHeight: 1.69,
          },
        },
      },
    },
  },
  zhCN
);

render(
  <StrictMode>
    <ThemeProvider theme={agileTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
