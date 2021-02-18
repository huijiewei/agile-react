import './wdyr';

import { StrictMode } from 'react';
import { render } from 'react-dom';

import App from './App';

import './serviceWorker';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
