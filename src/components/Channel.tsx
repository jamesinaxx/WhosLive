/* eslint-disable camelcase */
import { FunctionComponent, PropsWithChildren } from 'react';
import { FastAverageColorResult } from 'fast-average-color';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { TwitchStream } from '../types/twitch';
import FavoriteButton from './buttons/FavoriteButton';

const parseRgba = ({ value }: FastAverageColorResult) =>
  `rgba(${value[0]},${value[1]},${value[2]},0.7)`;

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

const ChannelSubcontainer = styled(motion.button)`
  border-radius: 15px;
  width: 80vw;
  height: 120px;
  margin: 10px;

  border: none;
  background: none;

  cursor: pointer;
`;

const Pfp = styled.img`
  background: none;
  border: none;
  margin: 10px;
  float: left;
  border-radius: 15px;
  width: 100px;
  height: 100px;
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

const StreamTitle = styled.h1`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Channel: FunctionComponent<PropsWithChildren<ChannelProps>> = ({
  data,
  hidden,
  favorite = false,
  setFavorites,
}) => {
  const {
    title,
    user_name,
    user_login,
    viewer_count,
    game_name,
    profile_image_url,
    average_color,
  } = data;

  return (
    <ChannelContainer title={title} hidden={hidden}>
      <ChannelSubcontainer
        style={{
          backgroundColor: average_color ? parseRgba(average_color) : '#000',
          color: average_color?.isLight ? '#000' : '#FFF',
          boxShadow: `0 0 10px ${
            average_color ? parseRgba(average_color) : '#000'
          }`,
        }}
        onClick={() => window.open(`https://twitch.tv/${user_login}`)}
        type="button"
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
      >
        <Pfp
          src={profile_image_url}
          crossOrigin="anonymous"
          alt={`${user_name} stream thumbnail`}
        />
        <InfoContainer>
          <StreamTitle>{title}</StreamTitle>
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
