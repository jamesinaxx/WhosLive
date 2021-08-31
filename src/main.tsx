import { Component } from 'react';
import './styles/global.scss';
import Live from './pages/Live';
import { getChannelInfo, getStorage, setStorage } from './lib/chromeapi';
import NoAuthPage from './pages/NoAuth';
import validateToken from './lib/validateToken';
import Loading from './components/Loading';
import Error404 from './pages/404';
import InvalidateToken from './components/InvalidateToken';
import { clientId, checkConnection, objToParams } from './lib/lib';
import Layout from './components/Layout';
import LogoutButton from './components/buttons/LogoutButton';

interface MainState {
  userToken: string | undefined;
  tokenValid: boolean;
  showRUSure: boolean;
  colorMode: 'light' | 'dark';
  connected: boolean | null;
}

export default class Main extends Component<any, MainState> {
  constructor(props: any) {
    super(props);

    this.state = {
      userToken: undefined,
      tokenValid: true,
      showRUSure: false,
      colorMode: 'dark',
      connected: null,
    };

    this.validateToken = this.validateToken.bind(this);
    this.invalidateToken = this.invalidateToken.bind(this);
    this.toggleColorMode = this.toggleColorMode.bind(this);
  }

  async componentDidMount() {
    await this.validateToken();

    await this.setColor();

    chrome.storage.onChanged.addListener(async () => {
      await this.validateToken();
      await this.setColor();
    });
  }

  async setColor() {
    const colorMode =
      (await getStorage<'light' | 'dark'>('NowLive:Storage:Color')) || 'dark';
    this.setState({ colorMode });
    document.body.className = this.state.colorMode;
  }

  async validateToken() {
    const res = await getStorage<string>('NowLive:Storage:Token');
    const valid = await validateToken(res);

    this.setState({
      userToken: valid ? res : 'invalid',
      tokenValid: valid,
    });
  }

  async invalidateToken() {
    const token = await getStorage<string>('NowLive:Storage:Token');
    try {
      await fetch(
        `https://id.twitch.tv/oauth2/revoke${objToParams({ clientId, token })}`,
        {
          method: 'POST',
        },
      );
    } catch (err) {
      console.error(err);
    }

    await setStorage('NowLive:Storage:Token', '');

    this.setState({
      showRUSure: false,
      userToken: 'invalid',
      tokenValid: false,
    });
    return getChannelInfo();
  }

  async toggleColorMode() {
    await setStorage(
      'NowLive:Storage:Color',
      this.state.colorMode === 'light' ? 'dark' : 'light',
    );
  }

  render() {
    if (this.state.showRUSure) window.scrollTo(0, 0);

    const color = this.state.colorMode === 'dark' ? '#fff' : '#000';
    const bgColor = this.state.colorMode === 'dark' ? '#1e1f20' : '#fff';

    const docBody = document.querySelector('body') as HTMLBodyElement;

    docBody.style.backgroundColor = bgColor;
    docBody.style.color = color;

    if (this.state.connected === false) {
      return (
        <Layout
          toggleColor={this.toggleColorMode}
          mode={this.state.colorMode}
          shown={this.state.showRUSure}
        >
          <Error404 />
        </Layout>
      );
    }

    if (this.state.userToken === undefined || this.state.connected === null) {
      if (this.state.connected === null) {
        checkConnection()
          .then((res: boolean) => this.setState({ connected: res }))
          .catch((res: boolean) => this.setState({ connected: res }));
      }

      return <Loading hidden={false} />;
    }

    window.addEventListener('scroll', () => {
      if (this.state.showRUSure) window.scrollTo(0, 0);
    });

    return (
      <Layout
        toggleColor={this.toggleColorMode}
        mode={this.state.colorMode}
        shown={this.state.showRUSure}
      >
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
            <Live color={color} />
            <LogoutButton
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
