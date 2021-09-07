import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  type: 'light',
  colors: {
    backgroundColor: '#FCFCFC',
    color: '#000',
    scrollbarColor: '#735bc7',
  },
};

export const darkTheme: DefaultTheme = {
  type: 'dark',
  colors: {
    backgroundColor: '#1e1f20',
    color: '#FFF',
    scrollbarColor: '#44357a',
  },
};
