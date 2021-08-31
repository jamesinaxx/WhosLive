import 'regenerator-runtime';
import { PureComponent } from 'react';
import styles from '../styles/Layout.module.scss';
import Channel from '../components/Channel';
import { getStorageLocal } from '../lib/chromeapi';
import Loading from '../components/Loading';

interface ChannelsProps {
  channels: any[] | null | undefined;
  loaded: number;
  updateChannels: () => void;
  finishLoading: () => void;
}

function Channels({
  channels,
  loaded,
  updateChannels,
  finishLoading,
}: ChannelsProps): JSX.Element {
  if (channels === null || channels === undefined) {
    updateChannels();
    return <Loading hidden={false} />;
  }

  if (channels.length === 0) {
    return (
      <small className={styles.goFollow}>
        You do not follow anybody who is currently live
        <img
          src="https://cdn.frankerfacez.com/emoticon/425196/4"
          alt="Sadge Emote from FFZ"
        />
      </small>
    );
  }

  return (
    <div className={styles.container}>
      <Loading hidden={loaded === channels.length} />
      {channels.map((channelData, _index, channelsArray) => (
        <Channel
          online
          key={channelData.id}
          data={channelData}
          hidden={loaded !== channelsArray.length}
          doneLoading={finishLoading}
        />
      ))}
    </div>
  );
}

interface LiveProps {
  color: '#000' | '#fff';
}

interface LiveState {
  channels: any[] | null | undefined;
  loaded: number;
}

export default class Live extends PureComponent<LiveProps, LiveState> {
  constructor(props: any) {
    super(props);

    this.state = {
      channels: null,
      loaded: 0,
    };

    this.finishLoading = this.finishLoading.bind(this);
    this.updateChannels = this.updateChannels.bind(this);

    chrome.storage.onChanged.addListener(this.updateChannels);
    this.updateChannels();
  }

  componentDidMount() {
    // This checks every second to see if the channels have loaded yet and if they have it stops checking
    const interval = setInterval(async () => {
      const res = await getStorageLocal<any[] | undefined>(
        'NowLive:Storage:Channels',
      );
      if (res === undefined) return;
      clearInterval(interval);
      this.setState({ channels: res });
    }, 1000);
  }

  async updateChannels() {
    this.setState({
      channels: await getStorageLocal('NowLive:Storage:Channels'),
    });
  }

  finishLoading() {
    this.setState(oldState => ({ loaded: oldState.loaded + 1 }));
  }

  render() {
    return (
      <div className={styles.main}>
        <Channels
          channels={this.state.channels}
          loaded={this.state.loaded}
          updateChannels={this.updateChannels}
          finishLoading={this.finishLoading}
        />
      </div>
    );
  }
}
