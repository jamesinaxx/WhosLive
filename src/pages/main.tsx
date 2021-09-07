import { FunctionComponent, useEffect, useState } from 'react';
import Live from './Live';
import { getChannelInfo, getStorage, setStorage } from '../lib/chromeapi';
import NoAuthPage from './NoAuth';
import isValidToken from '../lib/validateToken';
import Loading from '../components/Loading';
import Error404 from './404';
import InvalidateToken from '../components/InvalidateToken';
import { clientId, checkConnection, objToParams } from '../lib/lib';
import Layout from '../components/Layout';
import Logout from '../components/buttons/LogoutButton';
import { error } from '../lib/logger';

const Main: FunctionComponent = () => {
  const [userToken, setUserToken] = useState<string | undefined>(undefined);
  const [tokenValid, setTokenValid] = useState<boolean>(false);
  const [showRUSure, setShowRUSure] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean | undefined>(undefined);

  async function invalidateToken() {
    const token = (await getStorage('NowLive:Token')) || '';
    try {
      await fetch(
        `https://id.twitch.tv/oauth2/revoke${objToParams({ clientId, token })}`,
        {
          method: 'POST',
        },
      );
    } catch (err) {
      error(err);
    }
    await setStorage('NowLive:Token', '');

    setShowRUSure(false);
    setUserToken(undefined);
    setTokenValid(false);
    await getChannelInfo();
  }

  async function validateToken() {
    const res = await getStorage('NowLive:Token');
    const valid = await isValidToken(res);

    setUserToken(valid ? res : 'invalid');
    setTokenValid(valid);
  }

  useEffect(() => {
    (async () => {
      await validateToken();

      chrome.storage.onChanged.addListener(async (_changes, area) => {
        if (area === 'sync') {
          await validateToken();
        }
      });
    })();
  });

  if (showRUSure) window.scrollTo(0, 0);

  if (connected === false) {
    return (
      <Layout shown={showRUSure}>
        <Error404 />
      </Layout>
    );
  }

  if (userToken === undefined || connected === undefined) {
    if (connected === undefined) {
      checkConnection()
        .then((res: boolean) => setConnected(res))
        .catch((res: boolean) => setConnected(res));
    }

    return <Loading />;
  }

  window.addEventListener('scroll', () => {
    if (showRUSure) window.scrollTo(0, 0);
  });

  return (
    <Layout shown={showRUSure}>
      {userToken && tokenValid ? (
        <>
          {showRUSure && (
            <InvalidateToken
              onChoice={invalidate => {
                if (invalidate) {
                  return invalidateToken();
                }

                document.body.style.overflow = '';
                return setShowRUSure(false);
              }}
            />
          )}
          <Live />
          <Logout onClick={() => setShowRUSure(true)} shown={showRUSure} />
        </>
      ) : (
        <NoAuthPage />
      )}
    </Layout>
  );
};

export default Main;
