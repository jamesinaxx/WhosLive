/* eslint-disable camelcase */ // The properties are named with snake_case because thats how the Twitch api works
import { useRef, useState } from 'react';
import FastAverageColor from 'fast-average-color';
import styled from 'styled-components';
import { getTitle } from '../lib/lib';
import type { TwitchStream } from '../types/twitch';
import FavoriteButton from './buttons/FavoriteButton';

interface ChannelProps {
  data: TwitchStream;
  doneLoading: () => void;
  hidden: boolean;
  favorite?: boolean;
  setFavorites: (old: boolean) => void;
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

const Channel = ({
  data,
  hidden,
  doneLoading,
  favorite = false,
  setFavorites,
}: ChannelProps) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#FFF');
  const [color, setColor] = useState<string>('#000');

  const imageRef = useRef<HTMLImageElement>(null);

  const {
    title,
    user_name,
    user_login,
    viewer_count,
    game_name,
    thumbnail_url,
  } = data;

  const thumbnailUrl = thumbnail_url
    .replace('{width}', '128')
    .replace('{height}', '72');

  const getColor = () => {
    const fac = new FastAverageColor();

    const ac = fac.getColor(imageRef.current!);

    const bgColor = `rgba(${ac.rgb.substring(4).replace(')', '')},0.7)`;

    setColor(ac.isLight ? '#000' : '#FFF');
    setBackgroundColor(bgColor);

    fac.destroy();
    doneLoading();
  };

  return (
    <ChannelContainer title={title} hidden={hidden}>
      <ChannelDiv
        style={{
          backgroundColor,
          color,
          boxShadow: `0 0 10px ${backgroundColor}`,
        }}
      >
        <img
          ref={imageRef}
          onLoad={getColor}
          src={thumbnailUrl}
          crossOrigin="anonymous"
          onClick={() => window.open(`https://twitch.tv/${user_login}`)}
          alt={`${user_name} stream thumbnail`}
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
      <FavoriteButton favorite={favorite} toggleFavorite={setFavorites} />
    </ChannelContainer>
  );
};

export default Channel;
