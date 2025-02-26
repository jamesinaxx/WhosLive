import { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import LoadingContext from "./lib/LoadingContext";
import Main from "./pages/main";
import "@fontsource/noto-sans";
import "./index.css";

// TODO: Add support for multiple pages of live streams
function App() {
  const [loading, setLoading] = useState(true);

  const loadingContext = useMemo(
    () => ({ isLoading: loading, setLoading }),
    [loading, setLoading],
  );

  return (
    <LoadingContext.Provider value={loadingContext}>
      <Main />
    </LoadingContext.Provider>
  );
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

root.render(<App />);
