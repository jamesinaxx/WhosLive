import { clientId } from './lib';

export async function setStorage(key: string, value: any): Promise<void> {
  chrome.storage.sync.set({ [key]: value }, () => {
    console.log(`Set ${key} in synced chrome storage`);
  });
}

export async function getStorage(
  key: 'NowLive:Storage:Token' | string,
): Promise<any> {
  return new Promise(resolve => {
    chrome.storage.sync.get([key], res => {
      console.log(`Got ${key} from synced chrome storage`);
      resolve(res[key]);
    });
  });
}

export async function setStorageLocal(key: string, value: any): Promise<void> {
  chrome.storage.local.set({ [key]: value }, () => {
    console.log(`Set ${key} in local chrome storage`);
  });
}

export async function getStorageLocal(
  key: 'NowLive:Storage:Channels' | string,
): Promise<any> {
  return new Promise(resolve => {
    chrome.storage.local.get([key], res => {
      console.log(`Got ${key} from local chrome storage`);
      resolve(res[key]);
    });
  });
}

export async function getChannelInfo(): Promise<void> {
  const token = await getStorage('NowLive:Storage:Token');
  console.log('Token:', token);
  console.debug('Updating channel info');
  if (!token) {
    chrome.action.setTitle({
      title: `Please verify Now Live`,
    });
    chrome.action.setBadgeText({ text: '' });
    return console.debug('Token is undefined');
  }
  try {
    const userId = (
      await (
        await fetch('https://api.twitch.tv/helix/users', {
          headers: {
            'Client-Id': clientId,
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    ).data[0].id;

    const res = await (
      await fetch(
        `https://api.twitch.tv/helix/streams/followed?user_id=${userId}`,
        {
          headers: {
            'Client-Id': clientId,
            Authorization: `Bearer ${token}`,
          },
        },
      )
    ).json();

    const streamingNow = Number(res.data.length.toString());

    if (streamingNow !== 0) {
      chrome.action.setTitle({
        title: `There are ${streamingNow} people streaming right now`,
      });
      chrome.action.setBadgeText({
        text: streamingNow.toString(),
      });
    } else {
      chrome.action.setTitle({
        title: `There is nobody streaming right now`,
      });
      chrome.action.setBadgeText({ text: '' });
    }

    setStorageLocal('NowLive:Storage:Channels', res.data);
  } catch (error) {
    console.error(error);
  }
  return console.debug('Updated channel info');
}
