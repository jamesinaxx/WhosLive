import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useCallback,
} from "react";
import Channel from "../components/Channel";
import { getStorage, setStorage } from "../lib/chromeapi";
import NoLiveChannels from "../components/NoLiveChannels";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { TwitchStream } from "../types/twitch";
import LoadingContext from "../lib/LoadingContext";

type ChannelsType = TwitchStream[] | undefined;

async function updateChannels(
  setChannels: Dispatch<SetStateAction<ChannelsType>>,
) {
  return setChannels(await getStorage("NowLive:Channels"));
}

function Live() {
  const { loading } = useContext(LoadingContext);
  const [favoriteChannels, setFavoriteChannels] = useState<Set<string>>(
    new Set(),
  );
  const [channels, setChannels] = useState<ChannelsType>(undefined);

  const [parent] = useAutoAnimate();

  useEffect(() => {
    const listener = () => updateChannels(setChannels);
    browser.storage.onChanged.addListener(listener);

    (async () => {
      setChannels(await getStorage("NowLive:Channels"));
      const newFavoriteChannels = (await getStorage("NowLive:Favorites")) || [];
      setFavoriteChannels(new Set(newFavoriteChannels));
    })();

    return () => {
      browser.storage.onChanged.removeListener(listener);
    };
  }, []);

  const toggleFavorite = useCallback((userId: string) => {
    setFavoriteChannels((oldFaves) => {
      if (oldFaves.has(userId)) {
        oldFaves.delete(userId);
      } else {
        oldFaves.add(userId);
      }
      setStorage("NowLive:Favorites", [...oldFaves]);
      return oldFaves;
    });
  }, []);

  const sortChannels = useCallback(
    (left: TwitchStream, right: TwitchStream): number => {
      const leftFave = favoriteChannels.has(left.user_id);
      const rightFave = favoriteChannels.has(right.user_id);

      if (leftFave && !rightFave) {
        return -1;
      }
      if (!leftFave && rightFave) {
        return 1;
      }

      if (left.viewer_count < right.viewer_count) {
        return 1;
      }
      if (left.viewer_count > right.viewer_count) {
        return -1;
      }
      return 0;
    },
    [favoriteChannels],
  );

  if (!channels) {
    return null;
  }

  return (
    <ul className="mb-[110px] text-center" ref={parent}>
      {channels.length === 0 ? (
        <NoLiveChannels />
      ) : (
        channels
          .sort(sortChannels)
          .map((channel) => (
            <Channel
              key={channel.id}
              data={channel}
              hidden={loading}
              favorite={favoriteChannels.has(channel.user_id)}
              setFavorites={() => toggleFavorite(channel.user_id)}
            />
          ))
      )}
    </ul>
  );
}

export default Live;
