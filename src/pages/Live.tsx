import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Channel from '../components/Channel';
import { getStorageLocal } from '../lib/chromeapi';
import Loading from '../components/Loading';
import NoLiveChannels from '../components/NoLiveChannels';
import type { TwitchStream } from '../types/twitch';
import Container from '../components/Container';

type ChannelsType = TwitchStream[] | undefined;

const updateChannels = async (
  setChannels: Dispatch<SetStateAction<ChannelsType>>,
) => setChannels(await getStorageLocal('NowLive:Channels'));

const finishLoading = (setLoaded: Dispatch<SetStateAction<number>>) => {
  setLoaded(old => old + 1);
};

const toggleFavorite = (
  wasFave: boolean,
  userId: string,
  setLoaded: Dispatch<SetStateAction<number>>,
  setFavoriteChannels: Dispatch<SetStateAction<string[]>>,
) => {
  setLoaded(old => old - 1);
  if (wasFave) {
    setFavoriteChannels(oldFaves => oldFaves.filter(fav => fav !== userId));
  } else {
    setFavoriteChannels(oldFaves => [...oldFaves, userId]);
  }
};

const Live = () => {
  const [favoriteChannels, setFavoriteChannels] = useState<string[]>([]);
  const [channels, setChannels] = useState<ChannelsType>(undefined);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    setFavoriteChannels(['84432477']);
    // This checks every second to see if the channels have loaded yet and if they have it stops checking
    const interval = setInterval(async () => {
      const res = await getStorageLocal('NowLive:Channels');
      if (res === undefined) return;
      clearInterval(interval);
      setChannels(res);
    }, 1000);
  }, []);

  chrome.storage.onChanged.addListener(() => updateChannels(setChannels));

  if (channels === undefined) {
    return <Loading />;
  }

  if (channels.length === 0) {
    return <NoLiveChannels />;
  }

  const loading = !(loaded === channels.length);

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
            setFavorites={old =>
              toggleFavorite(
                old,
                channel.user_id,
                setLoaded,
                setFavoriteChannels,
              )
            }
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
            setFavorites={old =>
              toggleFavorite(
                old,
                channel.user_id,
                setLoaded,
                setFavoriteChannels,
              )
            }
          />
        ))}
    </Container>
  );
};

export default Live;
