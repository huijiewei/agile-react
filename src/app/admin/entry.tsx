import './wdyr';

import { StrictMode } from 'react';
import { render } from 'react-dom';

import App from './App';

import '@admin/assets/styles/admin.css';

import './serviceWorker';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { zhCN } from '@material-ui/core/locale';

const theme = createMuiTheme(
  {
    palette: {},
    typography: {
      fontSize: 14,
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          variant: 'contained',
          disableElevation: true,
        },
      },
    },
  },
  zhCN
);

render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
