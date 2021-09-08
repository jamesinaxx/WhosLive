import { FunctionComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider,
} from 'styled-components';
import { getStorageLocal } from '../lib/chromeapi';
import Themes from '../theme';
import Main from './main';

const GlobalStyle = createGlobalStyle`
    body::-webkit-scrollbar {
      width: 0.5em;
    }

    body::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.scrollbarColor};
      border-radius: 25px;
    }

    body {
      transition: background-color 100ms ease-in-out;
      // Width and height to cap extension size, Can cause issues with scrollbar showing when there is nothing to scroll
      width: 550px;
      height: 550px;
      background-color: ${props => props.theme.colors.backgroundColor};
      color: ${props => props.theme.colors.color};
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

export default App;
