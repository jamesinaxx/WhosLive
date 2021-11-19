/* eslint-disable camelcase */
import { FunctionComponent, useMemo, useRef } from 'react';
import FastAverageColor from 'fast-average-color';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';
import { getTitle } from '../lib/lib';
import type { TwitchStream } from '../types/twitch';
import FavoriteButton from './buttons/FavoriteButton';

const parseRgba = (rgb: string) =>
  `rgba(${rgb.substring(4).replace(')', '')},0.7)`;

interface ChannelProps {
  data: TwitchStream;
  hidden: boolean;
  favorite?: boolean;
  setFavorites: (old: boolean) => void;
}

const Channel: FunctionComponent<ChannelProps> = ({
  data,
  hidden,
  favorite = false,
  setFavorites,
}) => {
  const fac = useMemo(() => new FastAverageColor(), []);
  const imageRef = useRef<HTMLImageElement>(null);

  const colors = useMemo(
    () => (imageRef.current ? fac.getColor(imageRef.current) : null),
    [imageRef.current],
  );

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
          backgroundColor: colors ? parseRgba(colors.rgb) : '#000',
          color: colors?.isLight ? '#000' : '#FFF',
          boxShadow: `0 0 10px ${colors ? parseRgba(colors.rgb) : '#000'}`,
        }}
      >
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          css={css`
            transition: transform 100ms ease-in-out;
            background: none;
            border: none;
            margin: 10px;
            float: left;
            cursor: pointer;
            img {
              border-radius: 15px;
            }
          `}
          onClick={() => window.open(`https://twitch.tv/${user_login}`)}
          type="button"
        >
          <img
            ref={imageRef}
            src={profile_image_url}
            crossOrigin="anonymous"
            alt={`${user_name} stream thumbnail`}
            width={100}
            height={100}
          />
        </motion.button>
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
