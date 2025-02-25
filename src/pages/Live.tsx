import {
  FunctionComponent,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  PropsWithChildren,
  useCallback,
} from "react";
import Channel from "../components/Channel";
import { getStorage, getStorageLocal, setStorage } from "../lib/chromeapi";
import NoLiveChannels from "../components/NoLiveChannels";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { TwitchStream } from "../types/twitch";
import LoadingContext from "../lib/LoadingContext";

type ChannelsType = TwitchStream[] | undefined;

const updateChannels = async (
  setChannels: Dispatch<SetStateAction<ChannelsType>>,
) => setChannels(await getStorageLocal("NowLive:Channels"));

const Live: FunctionComponent<PropsWithChildren<unknown>> = () => {
  const { isLoading } = useContext(LoadingContext);
  const [favoriteChannels, setFavoriteChannels] = useState<Set<string>>(
    new Set(),
  );
  const [channels, setChannels] = useState<ChannelsType>(undefined);

  const [parent] = useAutoAnimate();

  useEffect(() => {
    chrome.storage.onChanged.addListener(() => updateChannels(setChannels));
    (async () => {
      setChannels(await getStorageLocal("NowLive:Channels"));
      const newFavoriteChannels = (await getStorage("NowLive:Favorites")) || [];
      setFavoriteChannels(new Set(newFavoriteChannels));
    })();
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
              hidden={isLoading}
              favorite={favoriteChannels.has(channel.user_id)}
              setFavorites={() => toggleFavorite(channel.user_id)}
            />
          ))
      )}
    </ul>
  );
};

export default Live;
