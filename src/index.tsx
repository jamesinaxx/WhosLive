import { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss';
import dayjs from 'dayjs';
import Live from './pages/Live';
import { getChannelInfo, getStorage, setStorage } from './lib/chromeapi';
import NoAuthPage from './pages/NoAuth';
import validateToken from './lib/tokenValid';
import Loading from './components/Loading';
import Error404 from './pages/404';
import InvalidateToken from './components/InvalidateToken';
import {
  clientId,
  connectionType,
  checkConnection,
  toggleColorMode,
  objToParams,
} from './lib/lib';
import Layout from './components/Layout';
import LogoutButton from './components/buttons/LogoutButton';

interface MainState {
  userToken: string | undefined;
  tokenValid: boolean;
  showRUSure: boolean;
  colorMode: 'light' | 'dark';
  connected: boolean | null;
}

class Main extends Component<any, MainState> {
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
  }

  componentDidMount() {
    this.validateToken();

    this.setColor();

    chrome.storage.onChanged.addListener(() => {
      this.validateToken();
      this.setColor();
    });
  }

  async setColor() {
    const colorMode = await getStorage('NowLive:Storage:Color');
    this.setState({ colorMode });
    document.body.className = this.state.colorMode;
  }

  async validateToken() {
    const res = await getStorage('NowLive:Storage:Token');
    const valid = await validateToken(res);

    this.setState({
      userToken: valid ? res : 'invalid',
      tokenValid: valid,
    });
  }

  async invalidateToken() {
    const token = await getStorage('NowLive:Storage:Token');
    try {
      await fetch(
        `https://id.twitch.tv/oauth2/revoke${objToParams({ clientId, token })}`,
        {
          method: 'POST',
        },
      );
    } catch (error) {
      console.log(error);
    }

    await setStorage('NowLive:Storage:Token', '');

    this.setState({
      showRUSure: false,
      userToken: 'invalid',
      tokenValid: false,
    });
    return getChannelInfo();
  }

  render() {
    console.log(`[${dayjs().format('HH:mm:ss')}] Re-rendered`);
    if (this.state.showRUSure) window.scrollTo(0, 0);

    const color = this.state.colorMode === 'dark' ? '#fff' : '#000';
    const bgColor = this.state.colorMode === 'dark' ? '#1e1f20' : '#fff';

    const docBody = document.querySelector('body') as HTMLBodyElement;

    docBody.style.backgroundColor = bgColor;
    docBody.style.color = color;

    if (this.state.connected === false) {
      return (
        <Layout
          toggleColor={toggleColorMode}
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
          .then((res: connectionType) => {
            this.setState({ connected: res[0] });
          })
          .catch((res: connectionType) => {
            this.setState({ connected: res[0] });
            console.log('Failed to connect to twitch', res[1]);
          });
      }

      return <Loading hidden={false} />;
    }

    window.addEventListener('scroll', () => {
      if (this.state.showRUSure) window.scrollTo(0, 0);
    });

    return (
      <Layout
        toggleColor={toggleColorMode}
        mode={this.state.colorMode}
        shown={this.state.showRUSure}
      >
        {this.state.userToken && this.state.tokenValid ? (
          <>
            {this.state.showRUSure ? (
              <InvalidateToken
                show={() => {
                  document.body.style.overflow = '';
                  this.setState({
                    showRUSure: false,
                  });
                }}
                invalidateToken={this.invalidateToken}
              />
            ) : (
              <div>{null}</div>
            )}
            <Live color={color} />
            <LogoutButton
              ruSure={() => this.setState({ showRUSure: true })}
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

ReactDOM.render(<Main />, document.body);
