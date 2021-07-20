export function setStorage(key: string, value: any): void {
	chrome.storage.sync.set({ [key]: value }, () => {
		console.log(`Set ${key} in synced chrome storage`);
	});
}

export function getStorage(key: string): Promise<any> {
	return new Promise(resolve => {
		chrome.storage.sync.get([key], res => {
			console.log(`Got ${key} from synced chrome storage`);
			resolve(res[key]);
		});
	});
}

export function setStorageLocal(key: string, value: any): void {
	chrome.storage.local.set({ [key]: value }, () => {
		console.log(`Set ${key} in local chrome storage`);
	});
}

export function getStorageLocal(key: string): Promise<any> {
	return new Promise(resolve => {
		chrome.storage.local.get([key], res => {
			console.log(`Got ${key} from local chrome storage`);
			resolve(res[key]);
		});
	});
}

export async function getChannelInfo(client_id: string) {
	console.log('Updating channel info');
	if ((await getStorage('twitchtoken')) === undefined) {
		chrome.action.setTitle({
			title: `Please verify Now Live`,
		});
		chrome.action.setBadgeText({ text: '' });
		console.log('Token is undefined');
	}
	try {
		const userId = (
			await (
				await fetch('https://api.twitch.tv/helix/users', {
					headers: {
						'Client-Id': client_id,
						Authorization:
							'Bearer ' + (await getStorage('twitchtoken')),
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
						Authorization:
							'Bearer ' + (await getStorage('twitchtoken')),
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
