import { setStorage } from './chromeapi';

export default async function validateToken(token: string): Promise<boolean> {
  try {
    const res = await fetch('https://id.twitch.tv/oauth2/validate', {
      headers: {
        Authorization: `OAuth ${token}`,
      },
    });
    const resJson = await res.json();

    if (resJson.scopes.includes('user:read:follows') && resJson.expires_in) {
      setStorage('NowLive:Token', token);
      return true;
    }
    return false;
  } catch (ignore) {
    return false;
  }
}
