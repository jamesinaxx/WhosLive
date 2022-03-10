import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    type: 'light' | 'dark';
    colors: {
      backgroundColor: string;
      color: string;
      scrollbarColor: string;
    };
  }
}

interface ThemesType {
  light: DefaultTheme;
  dark: DefaultTheme;
}

const Themes: ThemesType = {
  light: {
    type: 'light',
    colors: {
      backgroundColor: '#FCFCFC',
      color: '#000',
      scrollbarColor: '#735bc7',
    },
  },
  dark: {
    type: 'dark',
    colors: {
      backgroundColor: '#1e1f20',
      color: '#FFF',
      scrollbarColor: '#44357a',
    },
  },
};

export default Themes;
