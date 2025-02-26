import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import LoadingContext from "./lib/LoadingContext";
import Main from "./pages/main";
import "@fontsource/noto-sans";
import "./index.css";

// TODO Add support for multiple pages of live streams
const App: FunctionComponent<PropsWithChildren<unknown>> = () => {
  const [themeLoaded, setThemeLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateTheme = async () => {
      setThemeLoaded(true);
    };

    updateTheme();
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === "local" && "NowLive:Theme" in changes) {
        updateTheme();
      }
    });
  }, []);

  const loadingContext = useMemo(
    () => ({ isLoading: loading, setLoading }),
    [loading, setLoading],
  );

  if (!themeLoaded) {
    // TODO: Add loading
    return null;
  }

  return (
    <LoadingContext.Provider value={loadingContext}>
      {/* <Global /> */}
      <Main />
    </LoadingContext.Provider>
  );
};

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

root.render(<App />);
