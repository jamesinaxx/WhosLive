import { getStorage, setStorage } from "./chromeapi";
import { clientId } from "./lib";

export default async function validateToken(
  checkToken?: string | undefined,
): Promise<boolean> {
  const token = checkToken || (await getStorage("NowLive:Token"));

  if (token === undefined) {
    console.error("No token found");
    return false;
  }

  try {
    const res = await fetch("https://id.twitch.tv/oauth2/validate", {
      headers: { Authorization: `OAuth ${token}` },
    }).then((notJson) => notJson.json());

    if (res.scopes.includes("user:read:follows") && res.expires_in) {
      await setStorage("NowLive:Token", token);
      const userId = (
        await fetch("https://api.twitch.tv/helix/users", {
          headers: { "Client-Id": clientId, Authorization: `Bearer ${token}` },
        }).then((notJson) => notJson.json())
      ).data[0].id;
      await setStorage("NowLive:UserId", userId);
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}
