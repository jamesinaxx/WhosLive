import 'regenerator-runtime';
import { Component } from 'react';
import styles from '../styles/Layout.module.scss';
import Channel from '../components/Channel';
import { getStorageLocal } from '../lib/chromeapi';
import Loading from '../components/Loading';

interface LiveProps {
  color: string;
}

interface LiveState {
  channels: any[] | null | undefined;
  doneLoading: number;
}

export default class Live extends Component<LiveProps, LiveState> {
  constructor(props: any) {
    super(props);

    this.state = {
      channels: null,
      doneLoading: 0,
    };

    this.doneLoading = this.doneLoading.bind(this);
    this.showChannels = this.showChannels.bind(this);
    this.updateChannels = this.updateChannels.bind(this);

    chrome.storage.onChanged.addListener(this.updateChannels);
    this.updateChannels();
  }

  componentDidMount() {
    const interval = setInterval(() => {
      getStorageLocal('NowLive:Storage:Channels').then((res: any[]) => {
        if (res === undefined) return;
        clearInterval(interval);
        this.setState({ channels: res });
      });
    }, 1000);
  }

  async updateChannels() {
    this.setState({
      channels: await getStorageLocal('NowLive:Storage:Channels'),
    });
  }

  doneLoading() {
    this.setState(oldState => ({ doneLoading: oldState.doneLoading + 1 }));
  }

  showChannels() {
    if (this.state.channels === null || this.state.channels === undefined) {
      this.updateChannels();
      return <Loading hidden={false} color={this.props.color} />;
    }

    if (this.state.channels.length === 0) {
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
      <div>
        <Loading
          hidden={this.state.doneLoading === this.state.channels.length}
          color={this.props.color}
        />
        {this.state.channels.map(channelData => (
          <Channel
            online
            key={channelData.id}
            data={channelData}
            /* I really shouldn't have to cast but here we are */
            hidden={
              this.state.doneLoading !== (this.state.channels as any[]).length
            }
            doneLoading={this.doneLoading}
          />
        ))}
        <div
          /* Placeholder so the channel cards don't flow beyond the viewport */
          style={{
            height: '5px',
          }}
        />
      </div>
    );
  }

  render() {
    return <div className={styles.main}>{this.showChannels()}</div>;
  }
}
