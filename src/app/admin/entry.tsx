import '@shared/utils/wdyr';

import { StrictMode } from 'react';
import { render } from 'react-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import theme from './theme';

import App from './App';

import './serviceWorker';

const agileTheme = extendTheme(theme);

render(
  <StrictMode>
    <ChakraProvider theme={agileTheme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
