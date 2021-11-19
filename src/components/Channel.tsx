/* eslint-disable camelcase */
import { FunctionComponent, RefObject, useRef, useState } from 'react';
import FastAverageColor from 'fast-average-color';
import { css } from '@emotion/react';
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
    <div
      title={title}
      hidden={hidden}
      css={css`
        padding: 0;
        border: none;
        background: none;
        position: relative;
      `}
    >
      <div
        css={css`
          user-select: none;
          padding: 10px;
          border-radius: 15px;
          width: 90vw;
          height: 120px;
          margin: 10px;
        `}
        style={{
          backgroundColor,
          color,
          boxShadow: `0 0 10px ${backgroundColor}`,
        }}
      >
        <button
          css={css`
            transition: transform 100ms ease-in-out;
            background: none;
            border: none;
            margin: 10px;
            float: left;
            cursor: pointer;
            &:hover {
              transform: scale(110%);
            }
            img {
              border-radius: 15px;
            }
          `}
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
        <div
          css={css`
            height: 100%;
            display: block;
            align-items: center;
            justify-content: space-between;
            margin-left: 100px;
            max-width: 425px;
            font-size: 2.3vw;
          `}
        >
          <h1>{getTitle(title)}</h1>
          <p>
            <b>{user_name}</b> is currently playing <b>{game_name}</b> for{' '}
            <b>
              {new Intl.NumberFormat(navigator.language).format(viewer_count)}
            </b>{' '}
            viewers
          </p>
        </div>
      </div>
      <FavoriteButton favorite={favorite} toggleFavorite={setFavorites} />
    </div>
  );
};

export default Channel;
