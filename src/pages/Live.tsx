import {
  FunctionComponent,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  PropsWithChildren,
} from 'react';
import Channel from '../components/Channel';
import { getStorage, getStorageLocal, setStorage } from '../lib/chromeapi';
import NoLiveChannels from '../components/NoLiveChannels';
import Container from '../components/Container';
import type { TwitchStream } from '../types/twitch';
import LoadingContext from '../lib/LoadingContext';

type ChannelsType = TwitchStream[] | undefined;

const updateChannels = async (
  setChannels: Dispatch<SetStateAction<ChannelsType>>,
) => setChannels(await getStorageLocal('NowLive:Channels'));

const Live: FunctionComponent<PropsWithChildren<unknown>> = () => {
  const { isLoading } = useContext(LoadingContext);
  const [favoriteChannels, setFavoriteChannels] = useState<Set<string>>(
    new Set(),
  );
  const [channels, setChannels] = useState<ChannelsType>(undefined);

  useEffect(() => {
    chrome.storage.onChanged.addListener(() => updateChannels(setChannels));
    (async () => {
      setChannels(await getStorageLocal('NowLive:Channels'));
      const newFavoriteChannels = (await getStorage('NowLive:Favorites')) || [];
      setFavoriteChannels(new Set(newFavoriteChannels));
    })();
  }, []);

  const toggleFavorite = (userId: string) => {
    setFavoriteChannels((oldFaves) => {
      if (oldFaves.has(userId)) {
        oldFaves.delete(userId);
      } else {
        oldFaves.add(userId);
      }
      setStorage('NowLive:Favorites', oldFaves);
      return oldFaves;
    });
    // } else {
    //   setFavoriteChannels((oldFaves) => {
    //     const newArray = [...oldFaves, userId];
    //     setStorage('NowLive:Favorites', newArray);
    //     return newArray;
    //   });
    // }
  };

  if (channels === undefined) {
    return null;
  }

  return (
    <Container>
      {channels.length === 0 && <NoLiveChannels />}
      {[...favoriteChannels].map((channelName) => {
        const channel = channels.find((c) => c.user_id === channelName);

        if (channel === undefined) return null;

        return (
          <Channel
            key={channel.id}
            data={channel}
            hidden={isLoading}
            favorite
            setFavorites={() => toggleFavorite(channel.user_id)}
          />
        );
      })}
      {channels
        .filter((channel) => !favoriteChannels.has(channel.user_id))
        .map((channel) => (
          <Channel
            key={channel.id}
            data={channel}
            hidden={isLoading}
            setFavorites={() => toggleFavorite(channel.user_id)}
          />
        ))}
    </Container>
  );
};

export default Live;
