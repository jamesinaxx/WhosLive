import axios from 'axios';
import { setStorage } from '@lib/chromeapi';

export default function validateToken(token: string): Promise<boolean> {
	return new Promise(resolve => {
		axios
			.get('https://id.twitch.tv/oauth2/validate', {
				headers: {
					Authorization: `OAuth ${token}`,
				},
			})
			.then(res => {
				if (
					res.data.scopes.length !== 0 &&
					!(res.data.scopes.length > 1) &&
					res.data.scopes[0] === 'user:read:follows' &&
					res.data.expires_in > 500
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
