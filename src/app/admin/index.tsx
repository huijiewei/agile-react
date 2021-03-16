import '@shared/utils/wdyr';

import { StrictMode } from 'react';
import { render } from 'react-dom';

import App from './App';

import './serviceWorker';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import agileTheme from './theme';

render(
  <StrictMode>
    <ThemeProvider theme={agileTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
