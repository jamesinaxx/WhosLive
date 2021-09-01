/* eslint-disable camelcase */ // The properties are named with snake_case because thats how the Twitch api works
import { Component } from 'preact';
import FastAverageColor from 'fast-average-color';
import styles from '../styles/Channel.module.scss';
import { getTitle } from '../lib/lib';

interface ChannelProps {
  online: boolean;
  data: {
    user_name: string;
    user_login: string;
    game_name: string;
    viewer_count: string;
    title: string;
    thumbnail_url: string;
  };
  doneLoading: () => void;
  hidden: boolean;
}

interface ChannelState {
  bgColor: string;
  color: string;
}

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

    const thumbnailUrl = thumbnail_url
      .replace('{width}', '128')
      .replace('{height}', '72');

    return (
      <div
        title={title}
        className={styles.channelDiv}
        hidden={this.props.hidden}
      >
        <div
          className={styles.channel}
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
          <div className={styles.channelInfo}>
            <h1>{getTitle(title)}</h1>
            <p>
              <b>{user_name}</b> is currently playing <b>{game_name}</b> for{' '}
              <b>
                {new Intl.NumberFormat(navigator.language).format(
                  Number(viewer_count),
                )}
              </b>{' '}
              viewers
            </p>
          </div>
        </div>
      </div>
    );
  }
}
