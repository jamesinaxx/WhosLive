import axios from 'axios';
import { client_id, token } from '../../public/config';
import { getStorage, setStorageLocal } from '../../../src/lib/chromeapi';

chrome.runtime.onInstalled.addListener(() => {
	console.log('Initialized chrome extension');
});

chrome.storage.onChanged.addListener(() => getChannelInfo);

function getChannelInfo() {
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
							'Just sent a request for the user: ' + '538134305'
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

function getChannelInfoInit() {
	return setTimeout(getChannelInfo, 60000);
}

getChannelInfoInit();

module.exports = getChannelInfo;
