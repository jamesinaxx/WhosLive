import { useCallback, useContext, useEffect, useState } from "react";
import Live from "./Live";
import NoAuthPage from "./NoAuth";
import Loading from "../components/Loading";
import Error from "./Error";
import { checkConnection } from "../lib/lib";
import LoadingContext from "../lib/LoadingContext";
import TokenContext from "../lib/TokenContext";
import isValidToken from "../lib/validateToken";

function Main() {
  const { loading, setLoading } = useContext(LoadingContext);
  const { tokenValid, setTokenValid } = useContext(TokenContext);
  const [connected, setConnected] = useState<boolean>(false);

  const validateToken = useCallback(async () => {
    const valid = await isValidToken();

    setTokenValid(valid);
    setConnected(valid);
    setLoading(false);
  }, [setLoading, setTokenValid]);

  useEffect(() => {
    (async () => {
      await validateToken();

      chrome.storage.onChanged.addListener(async (changes, area) => {
        if (area === "sync" && "NowLive:Token" in changes) {
          await validateToken();
        }
      });
    })();
  }, [validateToken]);

  if (connected === false) {
    if (loading === true) {
      checkConnection().then(validateToken);
    } else if (tokenValid === false) {
      return <NoAuthPage />;
    } else {
      return <Error />;
    }
  }

  if (loading) {
    return <Loading />;
  }

  return <Live />;
}

export default Main;
