/* eslint-disable camelcase */ // The properties are named with snake_case because thats how the Twitch api works
import { Component } from 'preact';
import FastAverageColor from 'fast-average-color';
import styled from 'styled-components';
import { getTitle } from '../lib/lib';
import type { TwitchStream } from '../types/twitch';

interface ChannelProps {
  online: boolean;
  data: TwitchStream;
  doneLoading: () => void;
  hidden: boolean;
}

interface ChannelState {
  bgColor: string;
  color: string;
}

const ChannelContainer = styled.div`
  padding: 0;
  border: none;
  background: none;
  position: relative;
`;

const ChannelDiv = styled.div`
  user-select: none;
  padding: 10px;
  img {
    transition: transform 100ms ease-in-out;
    border-radius: 15px;
    margin: 10px;
    float: left;
    cursor: pointer;
    &:hover {
      transform: scale(110%);
    }
  }
  border-radius: 15px;
  width: 90vw;
  height: 92px;
  margin: 10px;
`;

const ChannelInfo = styled.div`
  vertical-align: middle;
  text-align: center;
  margin-left: 100px;
  max-width: 425px;
  font-size: 30px;
  font-size: 2vw;
`;

export default class Channel extends Component<ChannelProps, ChannelState> {
  constructor(props: ChannelProps) {
    super(props);

    this.state = {
      bgColor: '#FFF',
      color: '#000',
    };

    this.getColor = this.getColor.bind(this);
  }

  async getColor() {
    const fac = new FastAverageColor();

    const facColor = await fac.getColorAsync(
      this.props.data.thumbnail_url
        .replace('{width}', '128')
        .replace('{height}', '72'),
    );

    const bgColor = `rgba${facColor.rgb.substring(
      3,
      facColor.rgb.length - 1,
    )},0.7)`;

    this.setState({
      bgColor,
      color: facColor.isLight ? '#000' : '#FFF',
    });

    fac.destroy();
    this.props.doneLoading();
  }

  render() {
    const {
      title,
      user_name,
      user_login,
      viewer_count,
      game_name,
      thumbnail_url,
    } = this.props.data;

    console.log(
      `The type of viewer count is ${typeof viewer_count} should be number`,
    );

    const thumbnailUrl = thumbnail_url
      .replace('{width}', '128')
      .replace('{height}', '72');

    return (
      <ChannelContainer title={title} hidden={this.props.hidden}>
        <ChannelDiv
          style={{
            backgroundColor: this.state.bgColor,
            color: this.state.color,
            boxShadow: `0 0 10px ${this.state.bgColor}`,
          }}
        >
          <img
            onLoad={this.getColor}
            onClick={() => window.open(`https://twitch.tv/${user_login}`)}
            alt={`${user_name} stream thumbnail`}
            src={thumbnailUrl}
            width={128}
            height={72}
          />
          <ChannelInfo>
            <h1>{getTitle(title)}</h1>
            <p>
              <b>{user_name}</b> is currently playing <b>{game_name}</b> for{' '}
              <b>
                {new Intl.NumberFormat(navigator.language).format(viewer_count)}
              </b>{' '}
              viewers
            </p>
          </ChannelInfo>
        </ChannelDiv>
      </ChannelContainer>
    );
  }
}
