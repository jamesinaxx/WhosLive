import { FunctionComponent, useEffect, useState } from 'react';
import { render } from 'react-dom';
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider,
} from 'styled-components';
import { getStorageLocal } from './lib/chromeapi';
import Themes from './theme';
import Main from './pages/main';

// TODO Add support for multiple pages of live streams

const GlobalStyle = createGlobalStyle`
    body::-webkit-scrollbar {
      width: 0.5em;
    }

    body::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.scrollbarColor};
      border-radius: 25px;
    }

    body {
      background-color: ${(props) => props.theme.colors.backgroundColor};
      transition: background-color 100ms ease-in-out;
      color: ${(props) => props.theme.colors.color};
      width: 550px;
      height: 550px;
    }
  `;

const App: FunctionComponent = () => {
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(Themes.light);
  const [themeLoaded, setThemeLoaded] = useState<boolean>(false);

  useEffect(() => {
    const updateTheme = async () => {
      const newTheme =
        Themes[(await getStorageLocal('NowLive:Theme')) || 'light'];

      setCurrentTheme(newTheme);
      setThemeLoaded(true);
    };

    updateTheme();
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'local' && 'NowLive:Theme' in changes) {
        updateTheme();
      }
    });
  }, []);

  if (!themeLoaded) {
    return <>{null}</>;
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Main />
    </ThemeProvider>
  );
};

if (!process.env.PRODUCTION) {
  import('./lib/chromeapi').then(({ getChannelInfo }) => getChannelInfo());
} else {
  document.oncontextmenu = (e) => e.preventDefault();
}

render(<App />, document.getElementById('root'));
