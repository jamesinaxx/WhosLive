import axios from 'axios';

import { client_id, token } from '../../public/config';
import { getStorage, setStorage } from './chromeapi';

export default class TwitchApi {
	userDefined: boolean;
	user: string;

	constructor() {
		getStorage('user').then((user: string) => {
			this.user = user || null;
			this.userDefined = this.user ? true : false;

			if (!this.userDefined) {
				console.log('User was not defined!');
				setStorage('channels', [{ timestamp: new Date().getTime() }]);
			} else {
				console.log('User was defined :)');
				this.getChannelInfoStartup();
			}
		});
	}

	getChannelInfoStartup() {
		axios
			.get('https://api.twitch.tv/helix/users', {
				params: { id: '538134305', first: 100 },
				headers: {
					'Client-Id': client_id,
					Authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				axios
					.get('https://api.twitch.tv/helix/users/follows', {
						params: {
							from_id: res.data.data[0].id,
							first: 100,
						},
						headers: {
							'Client-Id': client_id,
							Authorization: 'Bearer ' + token,
						},
					})
					.then((res) => {
						console.log(
							'Just sent a request for the user: ' + '538134305'
						);

						const channelIds: string[] = res.data.data.map(
							(channel) => channel.to_id
						);

						axios
							.get('https://api.twitch.tv/helix/streams', {
								params: {
									user_id: channelIds,
								},
								headers: {
									'Client-Id': client_id,
									Authorization: 'Bearer ' + token,
								},
							})
							.then((res) => {
								const data = res.data.data;
								data.timestamp = new Date().getTime();
								setStorage('channels', data);
							});
					})
					.catch((e) => console.error(e));
			});
	}
}
