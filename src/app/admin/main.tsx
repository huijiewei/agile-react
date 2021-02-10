import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import './serviceWorker';

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

render(
  <StrictMode>
    <ChakraProvider theme={agileTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root'),
);
