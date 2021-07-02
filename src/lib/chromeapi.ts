import axios from 'axios';

// eslint-disable-next-line no-undef
const Chrome = chrome;

function setStorage(
	key: string,
	value:
		| string
		| number
		| boolean
		| string[]
		| number[]
		| boolean[]
		| undefined
): void {
	Chrome.storage.sync.set({ [key]: value }, () => {
		console.log(`Set ${key} in synced chrome storage`);
	});
}

function getStorage(key: string): Promise<any> {
	return new Promise(resolve => {
		Chrome.storage.sync.get([key], res => {
			console.log(`Got ${key} from synced chrome storage`);
			resolve(res[key]);
		});
	});
}

function setStorageLocal(
	key: string,
	value:
		| string
		| number
		| boolean
		| string[]
		| number[]
		| boolean[]
		| undefined
): void {
	Chrome.storage.local.set({ [key]: value }, () => {
		console.log(`Set ${key} in local chrome storage`);
	});
}

function getStorageLocal(key: string): Promise<any> {
	return new Promise(resolve => {
		Chrome.storage.local.get([key], res => {
			console.log(`Got ${key} from local chrome storage`);
			resolve(res[key]);
		});
	});
}

async function getChannelInfo(
	client_id: string,
	twitchtoken: () => Promise<string | undefined>
) {
	console.log('Updating channel info');
	try {
		const userId = (
			await axios.get('https://api.twitch.tv/helix/users', {
				headers: {
					'Client-Id': client_id,
					Authorization: 'Bearer ' + (await twitchtoken()),
				},
			})
		).data.data[0].id;

		const resbJson = (
			await axios.get(
				'https://api.twitch.tv/helix/streams/followed?user_id=' +
					userId,
				{
					headers: {
						'Client-Id': client_id,
						Authorization: 'Bearer ' + (await twitchtoken()),
					},
				}
			)
		).data;

		Chrome.browserAction.setBadgeText({
			text: resbJson.data.length.toString(),
		});
		Chrome.browserAction.setTitle({
			title: 'Number of people streaming: ',
		});

		setStorageLocal('channels', resbJson.data);
	} catch (error) {
		console.log(error);
	}
	console.log('Updated channel info');
}

export {
	setStorage,
	getStorage,
	setStorageLocal,
	getStorageLocal,
	getChannelInfo,
};
