import { clientId } from './lib';
import { error } from './logger';
import type { Local, Synced } from '../types/chrome';
import type { TwitchStream, TwitchUser } from '../types/twitch';

export function setStorage(key: Synced, value: unknown): Promise<void> {
  return chrome.storage.sync.set({ [key]: value });
}

export function getStorage(
  key: 'NowLive:Favorites',
): Promise<string[] | undefined>;
export function getStorage(key: 'NowLive:Token'): Promise<string | undefined>;
export function getStorage(key: Synced): Promise<unknown>;
export function getStorage<T>(key: Synced): Promise<T | undefined> {
  return new Promise(resolve =>
    chrome.storage.sync.get(key, res => resolve(res[key])),
  );
}

export function setStorageLocal(key: Local, value: unknown): Promise<void> {
  return chrome.storage.local.set({ [key]: value });
}

export function getStorageLocal(
  key: 'NowLive:Channels',
): Promise<TwitchStream[] | undefined>;
export function getStorageLocal(
  key: 'NowLive:Theme',
): Promise<'light' | 'dark'>;
export function getStorageLocal<T>(key: Local): Promise<T> {
  return new Promise(resolve =>
    chrome.storage.local.get(key, res => resolve(res[key])),
  );
}

export async function setStorageIfNull(
  key: Synced,
  value: unknown,
): Promise<void> {
  if ((await getStorage(key)) === undefined) {
    setStorage(key, value);
  }
}

export async function setStorageLocalIfNull(
  key: Synced,
  value: unknown,
): Promise<void> {
  if ((await getStorage(key)) === undefined) {
    setStorage(key, value);
  }
}

const blobToBase64 = (blob: Blob): Promise<string> => {
  const reader = new FileReader();
  return new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export async function getChannelInfo(): Promise<void> {
  const token = await getStorage('NowLive:Token');
  if (!token) {
    await chrome.action.setTitle({
      title: 'Please verify Now Live',
    });
    await chrome.action.setBadgeText({ text: '' });
    return;
  }
  try {
    // Move this to initialization
    const userId = (
      await fetch('https://api.twitch.tv/helix/users', {
        headers: {
          'Client-Id': clientId,
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .catch(err => error(err))
    ).data[0].id;

    const startTime = new Date().getTime();
    const { data }: { data: TwitchStream[] } = await (
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

    const users: { data: TwitchUser[] } = await fetch(
      `https://api.twitch.tv/helix/users?id=${data
        .map(stream => stream.user_id)
        .join('&id=')}`,
      {
        headers: {
          'Client-Id': clientId,
          Authorization: `Bearer ${token}`,
        },
      },
    ).then(res => res.json());

    const withicons = data.map(stream => {
      const withicon = {
        ...stream,
        profile_image_url:
          users.data.find((user: TwitchUser) => user.id === stream.user_id)
            ?.profile_image_url || '',
      };

      return withicon;
    });

    // Downloads the images and converts them into a base64 url
    const withImages = await Promise.all(
      withicons.map(async stream => {
        const blob = await (
          await fetch(
            stream.profile_image_url
              .replace('{width}', '128')
              .replace('{height}', '72'),
          )
        ).blob();

        const withImage: TwitchStream = {
          ...stream,
          profile_image_url: await blobToBase64(blob),
        };

        return withImage;
      }),
    ).then(res => {
      const finishTime = new Date().getTime();

      console.log(
        `Finished downloading images in ${(finishTime - startTime) / 1000}s`,
      );

      return res;
    });

    const streamingNow = Number(data.length.toString());

    const { setTitle, setBadgeText } = chrome.action;

    if (streamingNow !== 0) {
      await setTitle({
        title: `There are ${streamingNow} people streaming right now`,
      });
      await setBadgeText({
        text: streamingNow.toString(),
      });
    } else {
      await setTitle({
        title: 'There is nobody streaming right now',
      });
      await setBadgeText({ text: '' });
    }

    await setStorageLocal('NowLive:Channels', withImages);
  } catch (err) {
    error(err);
  }
}
