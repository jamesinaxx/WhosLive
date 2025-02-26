import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import LoadingContext from "./lib/LoadingContext";
import Main from "./pages/main";
import "@fontsource/inter";
import "./index.css";
import InvalidateToken from "./components/InvalidateToken";
import { getChannelInfo, getStorage, setStorage } from "./lib/chromeapi";
import { clientId, objToParams } from "./lib/lib";
import TokenContext from "./lib/TokenContext";
import Layout from "./components/Layout";

// TODO: Add support for multiple pages of live streams
function App() {
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <TokenContext.Provider value={{ tokenValid, setTokenValid }}>
        <Layout
          setShow={(show) => {
            if (show.valueOf()) {
              dialogRef.current?.showModal();
            }
          }}
        >
          <InvalidateToken
            ref={dialogRef}
            onChoice={async (invalidate) => {
              if (invalidate) {
                const token = (await getStorage("NowLive:Token")) || "";
                try {
                  await fetch(
                    `https://id.twitch.tv/oauth2/revoke${objToParams({
                      clientId,
                      token,
                    })}`,
                    { method: "POST" },
                  );
                } catch (err) {
                  console.error(err);
                }
                await setStorage("NowLive:Token", "");

                setTokenValid(false);
                return getChannelInfo();
              }

              return dialogRef.current?.close();
            }}
          />
          <Main />
        </Layout>
      </TokenContext.Provider>
    </LoadingContext.Provider>
  );
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

root.render(<App />);
