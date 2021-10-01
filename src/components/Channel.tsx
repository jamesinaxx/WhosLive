/* eslint-disable camelcase */
import { FunctionComponent, RefObject, useRef, useState } from 'react';
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
  height: 120px;
  margin: 10px;
`;

const ChannelInfo = styled.div`
  height: 100%;
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-left: 100px;
  max-width: 425px;
  font-size: 2.3vw;
`;

const getColor = async (imageRef: RefObject<HTMLImageElement>) => {
  const fac = new FastAverageColor();

  const ac = await fac.getColorAsync(imageRef.current);

  const bgColor = `rgba(${ac.rgb.substring(4).replace(')', '')},0.7)`;
  const text = ac.isLight ? '#000' : '#FFF';

  fac.destroy();
  return { text, bgColor };
};

const Channel: FunctionComponent<ChannelProps> = ({
  data,
  hidden,
  doneLoading,
  favorite = false,
  setFavorites,
}) => {
  const [backgroundColor, setBackgroundColor] = useState('#FFF');
  const [color, setColor] = useState('#000');

  const imageRef = useRef<HTMLImageElement>(null);

  const {
    title,
    user_name,
    user_login,
    viewer_count,
    game_name,
    profile_image_url,
  } = data;

  return (
    <ChannelContainer title={title} hidden={hidden}>
      <ChannelDiv
        style={{
          backgroundColor,
          color,
          boxShadow: `0 0 10px ${backgroundColor}`,
        }}
      >
        <button
          onClick={() => window.open(`https://twitch.tv/${user_login}`)}
          type="button"
        >
          <img
            ref={imageRef}
            onLoad={() =>
              getColor(imageRef).then(({ text, bgColor }) => {
                setColor(text);
                setBackgroundColor(bgColor);
                doneLoading();
              })
            }
            src={profile_image_url}
            crossOrigin="anonymous"
            alt={`${user_name} stream thumbnail`}
            width={100}
            height={100}
          />
        </button>
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
