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
	chrome.storage.sync.set({ [key]: value }, () => {
		console.log(`Set ${key} in synced chrome storage`);
	});
}

function getStorage(key: string): Promise<any> {
	return new Promise(resolve => {
		chrome.storage.sync.get([key], res => {
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
	chrome.storage.local.set({ [key]: value }, () => {
		console.log(`Set ${key} in local chrome storage`);
	});
}

function getStorageLocal(key: string): Promise<any> {
	return new Promise(resolve => {
		chrome.storage.local.get([key], res => {
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
			await (
				await fetch('https://api.twitch.tv/helix/users', {
					headers: {
						'Client-Id': client_id,
						Authorization: 'Bearer ' + (await twitchtoken()),
					},
				})
			).json()
		).data[0].id;

		const res = await (
			await fetch(
				'https://api.twitch.tv/helix/streams/followed?user_id=' +
					userId,
				{
					headers: {
						'Client-Id': client_id,
						Authorization: 'Bearer ' + (await twitchtoken()),
					},
				}
			)
		).json();

		const streamingNow = Number(res.data.length.toString());

		if (streamingNow !== 0) {
			chrome.action.setTitle({
				title: `There are ${streamingNow} people streaming right now`,
			});
			chrome.action.setBadgeText({
				text: streamingNow.toString(),
			});
		} else {
			chrome.action.setTitle({
				title: `There is nobody streaming right now`,
			});
			chrome.action.setBadgeText({ text: '' });
		}

		setStorageLocal('channels', res.data);
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
