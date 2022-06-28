/* eslint-disable camelcase */
import { FunctionComponent, PropsWithChildren, useMemo, useRef } from 'react';
import { AverageColor } from 'avgcol';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { getTitle } from '../lib/lib';
import type { TwitchStream } from '../types/twitch';
import FavoriteButton from './buttons/FavoriteButton';

const parseRgba = (rgb: AverageColor) =>
  `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.7)`;

interface ChannelProps {
  data: TwitchStream;
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

const ChannelSubcontainer = styled.div`
  user-select: none;
  padding: 10px;
  border-radius: 15px;
  width: 90vw;
  height: 120px;
  margin: 10px;
`;

const Button = styled(motion.button)`
  transition: transform 100ms ease-in-out;
  background: none;
  border: none;
  margin: 10px;
  float: left;
  cursor: pointer;
  img {
    border-radius: 15px;
  }
`;

const InfoContainer = styled.div`
  height: 100%;
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-left: 100px;
  max-width: 425px;
  font-size: 2.3vw;
`;

const Channel: FunctionComponent<PropsWithChildren<ChannelProps>> = ({
  data,
  hidden,
  favorite = false,
  setFavorites,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const colors = useMemo(() => {
    if (imageRef.current) {
      return AverageColor.fromBase64(imageRef.current.src);
    }
    return null;
  }, [imageRef.current]);

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
      <ChannelSubcontainer
        style={{
          backgroundColor: colors ? parseRgba(colors) : '#000',
          color: colors?.isLight() ? '#000' : '#FFF',
          boxShadow: `0 0 10px ${colors ? parseRgba(colors) : '#000'}`,
        }}
      >
        <Button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
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
        </Button>
        <InfoContainer>
          <h1>{getTitle(title)}</h1>
          <p>
            <b>{user_name}</b> is currently playing <b>{game_name}</b> for{' '}
            <b>
              {new Intl.NumberFormat(navigator.language).format(viewer_count)}
            </b>{' '}
            viewers
          </p>
        </InfoContainer>
      </ChannelSubcontainer>
      <FavoriteButton favorite={favorite} toggleFavorite={setFavorites} />
    </ChannelContainer>
  );
};

export default Channel;
