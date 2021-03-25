import '@shared/utils/wdyr';

import { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './App';

import './serviceWorker';

import '@shared/assets/styles/agile.less';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
