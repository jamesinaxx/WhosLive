import { FunctionComponent, PropsWithChildren } from "react";
import { motion } from "framer-motion";
import type { TwitchColour, TwitchStream } from "../types/twitch";
import FavoriteButton from "./buttons/FavoriteButton";

const parseRgba = (colour: TwitchColour) =>
  `rgba(${colour.red},${colour.green},${colour.blue},0.7)`;

interface ChannelProps {
  data: TwitchStream;
  hidden: boolean;
  favorite?: boolean;
  setFavorites: (old: boolean) => void;
}

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
    <div
      title={title}
      hidden={hidden}
      className="relative border-none bg-none p-0"
    >
      <motion.button
        className="m-2.5 h-32 w-[80vw] cursor-pointer rounded-2xl border-none bg-none"
        style={{
          backgroundColor: average_color ? parseRgba(average_color) : "#000",
          color: average_color?.isLight ? "#000" : "#FFF",
          boxShadow: `0 0 10px ${
            average_color ? parseRgba(average_color) : "#000"
          }`,
        }}
        onClick={() => window.open(`https://twitch.tv/${user_login}`)}
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          className="float-left m-2.5 h-28 w-28 rounded-2xl border-none bg-none"
          src={profile_image_url}
          crossOrigin="anonymous"
          alt={`${user_name} stream thumbnail`}
        />
        <div className="left-32 block h-full max-w-sm items-center justify-between text-[2.3vw]">
          <h1 className="overflow-hidden">{title}</h1>
          <p>
            <b>{user_name}</b> is currently playing <b>{game_name}</b> for{" "}
            <b>
              {new Intl.NumberFormat(navigator.language).format(viewer_count)}
            </b>{" "}
            viewers
          </p>
        </div>
      </motion.button>
      <FavoriteButton favorite={favorite} toggleFavorite={setFavorites} />
    </div>
  );
};

export default Channel;
