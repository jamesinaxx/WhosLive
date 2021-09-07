import { useEffect, useState } from 'react';
import Channel from '../components/Channel';
import { getStorageLocal } from '../lib/chromeapi';
import Loading from '../components/Loading';
import NoLiveChannels from '../components/NoLiveChannels';
import type { TwitchStream } from '../types/twitch';
import Container from '../components/Container';

type ChannelsType = TwitchStream[] | null | undefined;

const Live = () => {
  const [channels, setChannels] = useState<ChannelsType>(null);
  const [loaded, setLoaded] = useState(0);

  const updateChannels = async () =>
    setChannels(await getStorageLocal('NowLive:Channels'));

  const finishLoading = () => {
    setLoaded(old => old + 1);
  };

  useEffect(() => {
    // This checks every second to see if the channels have loaded yet and if they have it stops checking
    const interval = setInterval(async () => {
      const res = await getStorageLocal('NowLive:Channels');
      if (res === undefined) return;
      clearInterval(interval);
      setChannels(res);
    }, 1000);
  }, []);

  chrome.storage.onChanged.addListener(updateChannels);

  if (channels === null || channels === undefined) {
    return <Loading />;
  }

  if (channels.length === 0) {
    return <NoLiveChannels />;
  }

  return (
    <Container>
      <Loading hidden={loaded === channels.length} />
      {channels.map(channelData => (
        <Channel
          key={channelData.id}
          data={channelData}
          hidden={loaded !== channels.length}
          doneLoading={finishLoading}
        />
      ))}
    </Container>
  );
};

export default Live;
