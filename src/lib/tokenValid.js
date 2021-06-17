import axios from 'axios';
import { Buffer } from 'buffer';
import { setStorage } from '../lib/chromeapi';

export default function validateToken(token) {
	return new Promise(resolve => {
		token = Buffer.from(token, 'base64').toString();

		axios
			.get('https://id.twitch.tv/oauth2/validate', {
				headers: {
					Authorization: `OAuth ${token}`,
				},
			})
			.then(res => {
				if (
					!(
						res.data.scopes.length !== 0 &&
						!(res.data.scopes.length > 1) &&
						res.data.scopes[0] === 'user:read:follows' &&
						res.data.expires_in > 500
					)
				)
					resolve(true);

				setStorage('twitchtoken', token);
				resolve(false);
			})
			.catch(res => {
				resolve(true);
			});
	});
}
