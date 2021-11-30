import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import dispatcher from './gateways/analytics';
import reportWebVitals from './reportWebVitals';

const theme = extendTheme(withDefaultColorScheme({ colorScheme: 'green' }), {
  colors: {
    primary: '#92CBC5', // green.500
    green: {
      '50': '#ddeeed',
      '100': '#d5ebe9',
      '200': '#c4e3e0',
      '300': '#b3dbd7',
      '400': '#a2d2cd',
      '500': '#92CBC5',
      '600': '#82c0bc',
      '700': '#71b7b3',
      '800': '#60afab',
      '900': '#52a39f',
    },
  },
  components: {
    Button: {
      variants: {
        outline: () => ({
          color: 'white',
          borderColor: 'white',
          _hover: {
            color: 'primary',
            bg: 'white',
          },
          _active: {
            color: 'primary',
            bg: 'white',
          },
        }),
      },
    },
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
