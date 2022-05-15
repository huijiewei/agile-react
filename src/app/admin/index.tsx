import '@shared/utils/wdyr';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

import './serviceWorker';

import { ChakraProvider } from '@chakra-ui/react';

import { agileTheme } from '@shared/theme';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={agileTheme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
