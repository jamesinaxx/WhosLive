import { FunctionComponent } from 'preact';
import { StateUpdater, useEffect, useState } from 'preact/hooks';
import Channel from '../components/Channel';
import { getStorage, getStorageLocal, setStorage } from '../lib/chromeapi';
import Loading from '../components/Loading';
import NoLiveChannels from '../components/NoLiveChannels';
import Container from '../components/Container';
import type { TwitchStream } from '../types/twitch';

type ChannelsType = TwitchStream[] | undefined;

const updateChannels = async (setChannels: StateUpdater<ChannelsType>) =>
  setChannels(await getStorageLocal('NowLive:Channels'));

const finishLoading = (setLoaded: StateUpdater<number>) => {
  setLoaded(old => old + 1);
};

const Live: FunctionComponent = () => {
  const [favoriteChannels, setFavoriteChannels] = useState<string[]>([]);
  const [channels, setChannels] = useState<ChannelsType>(undefined);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    (async () => {
      setChannels(await getStorageLocal('NowLive:Channels'));
      setFavoriteChannels((await getStorage('NowLive:Favorites')) || []);
    })();
  }, []);

  chrome.storage.onChanged.addListener(() => updateChannels(setChannels));

  if (channels === undefined) {
    return <Loading />;
  }

  if (channels.length === 0) {
    return <NoLiveChannels />;
  }

  const loading = !(loaded === channels.length);

  const toggleFavorite = (wasFave: boolean, userId: string) => {
    setLoaded(old => old - 1);
    if (wasFave) {
      setFavoriteChannels(oldFaves => {
        const newArray = oldFaves.filter(fav => fav !== userId);
        setStorage('NowLive:Favorites', newArray);
        return newArray;
      });
    } else {
      setFavoriteChannels(oldFaves => {
        const newArray = [...oldFaves, userId];
        setStorage('NowLive:Favorites', newArray);
        return newArray;
      });
    }
  };

  return (
    <Container>
      <Loading hidden={!loading} />
      {favoriteChannels.map(channelName => {
        const channel = channels.find(c => c.user_id === channelName);

        if (channel === undefined) return null;

        return (
          <Channel
            key={channel.id}
            data={channel}
            hidden={loading}
            doneLoading={() => finishLoading(setLoaded)}
            favorite
            setFavorites={old => toggleFavorite(old, channel.user_id)}
          />
        );
      })}
      {channels
        .filter(channel => !favoriteChannels.includes(channel.user_id))
        .map(channel => (
          <Channel
            key={channel.id}
            data={channel}
            hidden={loading}
            doneLoading={() => finishLoading(setLoaded)}
            setFavorites={old => toggleFavorite(old, channel.user_id)}
          />
        ))}
    </Container>
  );
};

export default Live;
