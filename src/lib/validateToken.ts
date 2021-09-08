import { setStorage } from './chromeapi';
import { clientId } from './lib';
import { error } from './logger';

export default async function validateToken(
  token: string | undefined,
): Promise<boolean> {
  try {
    const res = await fetch('https://id.twitch.tv/oauth2/validate', {
      headers: {
        Authorization: `OAuth ${token}`,
      },
    }).then(notJson => notJson.json());

    if (res.scopes.includes('user:read:follows') && res.expires_in) {
      await setStorage('NowLive:Token', token);
      // Move this to initialization
      const userId = (
        await fetch('https://api.twitch.tv/helix/users', {
          headers: {
            'Client-Id': clientId,
            Authorization: `Bearer ${token}`,
          },
        }).then(notJson => notJson.json())
      ).data[0].id;
      await setStorage('NowLive:UserId', userId);
      return true;
    }
    return false;
  } catch (err) {
    error(err);
    return false;
  }
}
