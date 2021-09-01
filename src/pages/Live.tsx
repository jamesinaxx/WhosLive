/* eslint-disable no-undef */
import 'regenerator-runtime';
import { Component } from 'preact';
import styled from 'styled-components';
import Channel from '../components/Channel';
import { getStorageLocal } from '../lib/chromeapi';
import Loading from '../components/Loading';
import { smolText } from '../styles/Mixins';

const NoLiveChannels = styled.small`
  ${smolText}
`;

const Container = styled.div`
  margin-bottom: 110px;
  padding-bottom: 60px;
  text-align: center;
`;

interface LiveProps {
  color: '#000' | '#fff';
}

interface LiveState {
  channels: any[] | null | undefined;
  loaded: number;
}

export default class Live extends Component<LiveProps, LiveState> {
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
    if (this.state.channels === null || this.state.channels === undefined) {
      this.updateChannels();
      return <Loading hidden={false} />;
    }

    if (this.state.channels.length === 0) {
      return (
        <NoLiveChannels>
          You do not follow anybody who is currently live
          <img
            src="https://cdn.frankerfacez.com/emoticon/425196/4"
            alt="Sadge Emote from FFZ"
          />
        </NoLiveChannels>
      );
    }

    return (
      <Container>
        <Loading hidden={this.state.loaded === this.state.channels.length} />
        {this.state.channels.map((channelData, _index, channelsArray) => (
          <Channel
            online
            key={channelData.id}
            data={channelData}
            hidden={this.state.loaded !== channelsArray.length}
            doneLoading={this.finishLoading}
          />
        ))}
      </Container>
    );
  }
}
