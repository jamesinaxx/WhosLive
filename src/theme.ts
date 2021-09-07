import { DefaultTheme } from 'styled-components';

// TODO Add better light mode vs dark mode scroll bars
export const lightTheme: DefaultTheme = {
  type: 'light',
  colors: {
    backgroundColor: '#FCFCFC',
    color: '#000',
    scrollbarColor: '#44357a',
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
