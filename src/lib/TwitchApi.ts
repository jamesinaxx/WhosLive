import axios from 'axios';

import { client_id, token } from '../../public/config';
import { getStorage, setStorageLocal } from './chromeapi';

export default class TwitchApi {
	userDefined: boolean;
	user: string;

	constructor() {
		getStorage('user').then((user: string) => {
			this.user = user || null;
			this.userDefined = this.user ? true : false;

			if (!this.userDefined) {
				console.log('User was not defined!');
				setStorageLocal('channels', [
					{ timestamp: new Date().getTime() },
				]);
			} else {
				console.log('User was defined :)');
				this.getChannelInfoStartup();
			}
		});
	}

	getChannelInfoStartup() {
		getStorage('user').then((userName) =>
			axios
				.get('https://api.twitch.tv/helix/users', {
					params: { login: userName },
					headers: {
						'Client-Id': client_id,
						Authorization: 'Bearer ' + token,
					},
				})
				.then((resa) => {
					console.log('Made first http req to Twitch');
					axios
						.get('https://api.twitch.tv/helix/streams/followed', {
							params: {
								user_id: resa.data.data[0].id,
							},
							headers: {
								'Client-Id': client_id,
								Authorization: 'Bearer ' + token,
								Accept: 'application/json',
							},
						})
						.then((resb) => {
							console.log('Made second http req to Twitch');
							console.log(
								'Just sent a request for the user: ' +
									'538134305'
							);

							console.log(
								'This should be something like this idfk ' +
									resb.data.data
							);

							setStorageLocal('channels', resb.data.data);
						})
						.catch((e) => console.error(e));
				})
		);
	}
}
