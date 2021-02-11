import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './serviceWorker';

import ErrorProvider from '@shared/providers/ErrorProvider';
import ErrorDialog from '@admin/components/ErrorDialog';

render(
  <StrictMode>
    <ErrorProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ErrorDialog />
    </ErrorProvider>
  </StrictMode>,
  document.getElementById('root'),
);
