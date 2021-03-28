import '@shared/utils/wdyr';

import { StrictMode } from 'react';
import { render } from 'react-dom';

import { globalStyles } from '@shared/theme/stitches.config';
import { App } from './App';

import './serviceWorker';

globalStyles();

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
