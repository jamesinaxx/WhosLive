import { FunctionComponent, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Global, ThemeProvider, Theme, css } from '@emotion/react';
import { getStorageLocal } from './lib/chromeapi';
import Themes from './theme';
import Main from './pages/main';
import LoadingContext from './lib/LoadingContext';

// TODO Add support for multiple pages of live streams
const App: FunctionComponent = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(Themes.light);
  const [themeLoaded, setThemeLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

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
    return null;
  }

  return (
    <LoadingContext.Provider
      value={{
        isLoading: loading,
        setLoading,
      }}
    >
      <ThemeProvider theme={currentTheme}>
        <Global
          styles={css`
            body::-webkit-scrollbar {
              width: 0.5em;
            }

            body::-webkit-scrollbar-thumb {
              background-color: ${currentTheme.colors.scrollbarColor};
              border-radius: 25px;
            }

            body {
              background-color: ${currentTheme.colors.backgroundColor};
              transition: background-color 100ms ease-in-out;
              color: ${currentTheme.colors.color};
              width: 550px;
              height: 550px;
            }
          `}
        />
        <Main />
      </ThemeProvider>
    </LoadingContext.Provider>
  );
};

if (process.env.PRODUCTION) {
  document.oncontextmenu = (e) => e.preventDefault();
}

render(<App />, document.getElementById('root'));
