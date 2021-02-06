import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import '@shared/assets/styles/agile.less';

import './serviceWorker';
import ErrorDialog from '@admin/components/ErrorDialog';
import { ErrorProvider } from '@shared/providers/ErrorProvider';

const agileTheme = extendTheme({
  fontSizes: {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '22px',
    '3xl': '26px',
    '4xl': '32px',
  },
});

ReactDOM.render(
  <StrictMode>
    <ChakraProvider theme={agileTheme}>
      <ErrorProvider>
        <App />
        <ErrorDialog />
      </ErrorProvider>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root'),
);
