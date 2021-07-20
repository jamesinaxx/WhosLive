import { setStorage } from '@lib/chromeapi';

export default function validateToken(token: string): Promise<boolean> {
	return new Promise(resolve => {
		fetch('https://id.twitch.tv/oauth2/validate', {
			headers: {
				Authorization: `OAuth ${token}`,
			},
		})
			.then(async resBody => {
				const res = await resBody.json();
				if (
					res.scopes.includes('user:read:follows') &&
					res.expires_in > 500
				) {
					setStorage('twitchtoken', token);
					resolve(true);
				} else {
					resolve(false);
				}
			})
			.catch(() => {
				resolve(false);
			});
	});
}
