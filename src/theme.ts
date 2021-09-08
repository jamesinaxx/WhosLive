import { useEffect, useState } from 'preact/hooks';
import { DefaultTheme } from 'styled-components';
import { getStorageLocal } from './lib/chromeapi';

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
