import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import dispatcher from './gateways/analytics';
import reportWebVitals from './reportWebVitals';

const theme = extendTheme({
  colors: {
    primary: '#92CBC5',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Learn more: https://bit.ly/CRA-vitals
reportWebVitals(({ name, ...extras }) => dispatcher(name, extras));
