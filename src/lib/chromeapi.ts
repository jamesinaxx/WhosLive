import { Local, Synced } from '../types/chrome';
import { TwitchStream } from '../types/twitch';
import { clientId } from './lib';
import { error } from './logger';

export async function setStorage(key: Synced, value: any): Promise<void> {
  chrome.storage.sync.set({ [key]: value });
}

export function getStorage(key: 'NowLive:Token'): Promise<string>;
export function getStorage<T>(key: Synced): Promise<T> {
  return new Promise(resolve =>
    chrome.storage.sync.get(key, res => resolve(res[key])),
  );
}

export async function setStorageLocal(key: Local, value: any): Promise<void> {
  chrome.storage.local.set({ [key]: value });
}

export function getStorageLocal(
  key: 'NowLive:Channels',
): Promise<TwitchStream[] | undefined>;
export function getStorageLocal(key: 'NowLive:Theme'): Promise<string>;
export function getStorageLocal<T>(key: Local): Promise<T> {
  return new Promise(resolve =>
    chrome.storage.local.get(key, res => resolve(res[key])),
  );
}

export async function getChannelInfo(): Promise<void> {
  const token = await getStorage('NowLive:Token');
  if (!token) {
    await chrome.action.setTitle({
      title: `Please verify Now Live`,
    });
    await chrome.action.setBadgeText({ text: '' });
    return;
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
      await chrome.action.setTitle({
        title: `There are ${streamingNow} people streaming right now`,
      });
      await chrome.action.setBadgeText({
        text: streamingNow.toString(),
      });
    } else {
      await chrome.action.setTitle({
        title: `There is nobody streaming right now`,
      });
      await chrome.action.setBadgeText({ text: '' });
    }

    await setStorageLocal('NowLive:Channels', res.data);
  } catch (err) {
    error(err);
  }
}
