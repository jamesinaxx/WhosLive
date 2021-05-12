import axios from 'axios';

import { client_id, token } from '../../public/config';

axios
	.get('https://api.twitch.tv/helix/users', {
		params: { id: '538134305', first: 100 },
		headers: {
			'Client-Id': client_id,
			Authorization: 'Bearer ' + token,
			Accepts: 'application/json',
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
					Accepts: 'application/json',
				},
			})
			.then((res) => {
				console.log('Just sent a request for the user: ' + '538134305');

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
							Accepts: 'application/json',
						},
					})
					.then((res) => console.log(res.data.data));
			})
			.catch((e) => console.error(e));
	});
