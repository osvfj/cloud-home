import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { PathProvider } from '@/context';
import './index.css'

import App from '@/App';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <HashRouter>
        <PathProvider>
          <App />
        </PathProvider>
      </HashRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
