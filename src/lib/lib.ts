import { getStorage, setStorage } from './chromeapi';

export type connectionType = [boolean, any?];

export const clientId = process.env.CLIENTID as string;

interface fetchOptions extends RequestInit {
  timeout?: number | undefined;
}

export async function fetchWithTimeout(
  resourcename: string,
  options?: fetchOptions | undefined,
): Promise<Response> {
  const timeout = options?.timeout || 60000;

  const controller = new AbortController();

  const timeoutId = setTimeout(controller.abort, timeout);

  const res = await fetch(resourcename, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(timeoutId);

  return res;
}

export async function toggleColorMode() {
  setStorage(
    'NowLive:Storage:Color',
    (await getStorage('NowLive:Storage:Color')) === 'light' ? 'dark' : 'light',
  );
}

export async function checkConnection(): Promise<connectionType> {
  try {
    const fetchRes = await fetchWithTimeout('https://twitch.tv', {
      timeout: 10000,
    });
    const res = fetchRes.json();
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

interface Obj {
  [key: string]: string;
}

export function objToParams(obj: Obj): string {
  return `?${Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;
}
