import './wdyr';

import { StrictMode } from 'react';
import { render } from 'react-dom';

import App from './App';

import '@admin/assets/styles/admin.base.css';
import '@admin/assets/styles/admin.components.css';
import '@admin/assets/styles/admin.utilities.css';

import './serviceWorker';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
