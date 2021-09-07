import { Component } from 'react';
import Live from './Live';
import { getChannelInfo, getStorage, setStorage } from '../lib/chromeapi';
import NoAuthPage from './NoAuth';
import validateToken from '../lib/validateToken';
import Loading from '../components/Loading';
import Error404 from './404';
import InvalidateToken from '../components/InvalidateToken';
import { clientId, checkConnection, objToParams } from '../lib/lib';
import Layout from '../components/Layout';
import Logout from '../components/buttons/LogoutButton';
import { error } from '../lib/logger';

interface MainState {
  userToken: string | undefined;
  tokenValid: boolean;
  showRUSure: boolean;
  connected?: boolean | undefined;
}

export default class Main extends Component<any, MainState> {
  constructor(props: any) {
    super(props);

    this.state = {
      userToken: undefined,
      tokenValid: true,
      showRUSure: false,
    };

    this.validateToken = this.validateToken.bind(this);
    this.invalidateToken = this.invalidateToken.bind(this);
  }

  async componentDidMount() {
    await this.validateToken();

    chrome.storage.onChanged.addListener(async (_changes, area) => {
      if (area === 'sync') {
        await this.validateToken();
      }
    });
  }

  async validateToken() {
    const res = await getStorage('NowLive:Token');
    const valid = await validateToken(res);

    this.setState({
      userToken: valid ? res : 'invalid',
      tokenValid: valid,
    });
  }

  async invalidateToken() {
    const token = await getStorage('NowLive:Token');
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

    this.setState({
      showRUSure: false,
      userToken: 'invalid',
      tokenValid: false,
    });
    await getChannelInfo();
  }

  render() {
    if (this.state.showRUSure) window.scrollTo(0, 0);

    if (this.state.connected === false) {
      return (
        <Layout shown={this.state.showRUSure}>
          <Error404 />
        </Layout>
      );
    }

    if (
      this.state.userToken === undefined ||
      this.state.connected === undefined
    ) {
      if (this.state.connected === undefined) {
        checkConnection()
          .then((res: boolean) => this.setState({ connected: res }))
          .catch((res: boolean) => this.setState({ connected: res }));
      }

      return <Loading />;
    }

    window.addEventListener('scroll', () => {
      if (this.state.showRUSure) window.scrollTo(0, 0);
    });

    return (
      <Layout shown={this.state.showRUSure}>
        {this.state.userToken && this.state.tokenValid ? (
          <>
            {this.state.showRUSure && (
              <InvalidateToken
                onChoice={invalidate => {
                  if (invalidate) {
                    return this.invalidateToken();
                  }

                  document.body.style.overflow = '';
                  return this.setState({
                    showRUSure: false,
                  });
                }}
              />
            )}
            <Live />
            <Logout
              onClick={() => this.setState({ showRUSure: true })}
              shown={this.state.showRUSure}
            />
          </>
        ) : (
          <NoAuthPage />
        )}
      </Layout>
    );
  }
}
