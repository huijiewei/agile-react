import './wdyr';

import { StrictMode } from 'react';
import { render } from 'react-dom';

import App from './App';

import '@shared/assets/styles/agile.base.css';
import '@shared/assets/styles/agile.components.css';
import '@shared/assets/styles/agile.utilities.css';

import './serviceWorker';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
