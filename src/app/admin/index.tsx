import '@shared/utils/wdyr';

import { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './App';

import './serviceWorker';
import { ChakraProvider } from '@chakra-ui/react';

render(
  <StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
