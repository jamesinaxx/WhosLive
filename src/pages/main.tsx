import { FunctionComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
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
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [showRUSure, setShowRUSure] = useState(false);
  const [connected, setConnected] = useState<boolean>(false);

  // TODO Move these functions out of main function
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
    setTokenValid(false);
    await getChannelInfo();
  }

  async function validateToken() {
    const res = await getStorage('NowLive:Token');
    const valid = await isValidToken(res);

    setTokenValid(valid);
    setConnected(valid);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      await validateToken();

      chrome.storage.onChanged.addListener(async (changes, area) => {
        if (area === 'sync' && 'NowLive:Token' in changes) {
          await validateToken();
        }
      });
    })();
  });

  if (showRUSure) window.scrollTo(0, 0);

  if (connected === false) {
    if (loading === true) {
      checkConnection().then(validateToken);
      return <Loading />;
    }
    return (
      <Layout shown={showRUSure}>
        <Error404 />
      </Layout>
    );
  }

  window.addEventListener('scroll', () => {
    if (showRUSure) window.scrollTo(0, 0);
  });

  return (
    <Layout shown={showRUSure}>
      {tokenValid ? (
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
