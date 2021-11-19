import {
  FunctionComponent,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import Channel from '../components/Channel';
import { getStorage, getStorageLocal, setStorage } from '../lib/chromeapi';
import Loading from '../components/Loading';
import NoLiveChannels from '../components/NoLiveChannels';
import Container from '../components/Container';
import type { TwitchStream } from '../types/twitch';

type ChannelsType = TwitchStream[] | undefined;

const updateChannels = async (
  setChannels: Dispatch<SetStateAction<ChannelsType>>,
) => setChannels(await getStorageLocal('NowLive:Channels'));

const Live: FunctionComponent = () => {
  const [favoriteChannels, setFavoriteChannels] = useState<string[]>([]);
  const [channels, setChannels] = useState<ChannelsType>(undefined);

  useEffect(() => {
    (async () => {
      setChannels(await getStorageLocal('NowLive:Channels'));
      setFavoriteChannels((await getStorage('NowLive:Favorites')) || []);
    })();
  }, []);

  chrome.storage.onChanged.addListener(() => updateChannels(setChannels));

  const loading = channels === undefined;

  const toggleFavorite = (wasFave: boolean, userId: string) => {
    if (wasFave) {
      setFavoriteChannels((oldFaves) => {
        const newArray = oldFaves.filter((fav) => fav !== userId);
        setStorage('NowLive:Favorites', newArray);
        return newArray;
      });
    } else {
      setFavoriteChannels((oldFaves) => {
        const newArray = [...oldFaves, userId];
        setStorage('NowLive:Favorites', newArray);
        return newArray;
      });
    }
  };

  return (
    <Container>
      {loading || channels === undefined ? (
        <Loading />
      ) : (
        <>
          {channels.length === 0 && <NoLiveChannels />}
          {favoriteChannels.map((channelName) => {
            const channel = channels.find((c) => c.user_id === channelName);

            if (channel === undefined) return null;

            return (
              <Channel
                key={channel.id}
                data={channel}
                hidden={loading}
                favorite
                setFavorites={(old) => toggleFavorite(old, channel.user_id)}
              />
            );
          })}
          {channels
            .filter((channel) => !favoriteChannels.includes(channel.user_id))
            .map((channel) => (
              <Channel
                key={channel.id}
                data={channel}
                hidden={loading}
                setFavorites={(old) => toggleFavorite(old, channel.user_id)}
              />
            ))}
        </>
      )}
    </Container>
  );
};

export default Live;
