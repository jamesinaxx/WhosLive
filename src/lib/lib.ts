import axios from 'axios';
import { getStorage, setStorage } from './chromeapi';

export type connectionType = [boolean, any?];

export const clientId = process.env.CLIENTID as string;

export async function toggleColorMode() {
  setStorage(
    'NowLive:Storage:Color',
    (await getStorage('NowLive:Storage:Color')) === 'light' ? 'dark' : 'light',
  );
}

export async function checkConnection(): Promise<connectionType> {
  try {
    const res = await axios.get('https://twitch.tv', {
      timeout: 10000,
    });
    return [true, res];
  } catch (error) {
    return [false, error];
  }
}

export function getTitle(oldTitle: string): string {
  if (oldTitle.length > 25)
    return `${oldTitle.substring(
      0,
      oldTitle.length - (oldTitle.length - 22),
    )}...`;

  return oldTitle;
}
