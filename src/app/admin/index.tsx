import '@shared/utils/wdyr';

import { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './App';

import './serviceWorker';
import { ChakraProvider } from '@chakra-ui/react';

import agileTheme from './theme';

render(
  <StrictMode>
    <ChakraProvider theme={agileTheme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
