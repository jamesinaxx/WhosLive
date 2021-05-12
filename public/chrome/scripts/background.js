const client_id = 'r69gvllvchvhsh0zvmg8i518a8zf7e';
const token = 'h0qztx37s7ffbe3onmm45lr4b2h5fu';

chrome.runtime.onInstalled.addListener(async () => {
	console.log('Initialized chrome extension');
});

chrome.storage.onChanged.addListener(async () => getChannelInfo);

function getStorage(key) {
	return new Promise((resolve) => {
		chrome.storage.sync.get([key], (res) => {
			resolve(res[key]);
		});
	});
}

function setStorageLocal(key, value) {
	chrome.storage.local.set({ [key]: value }, () => {});
}

async function getChannelInfo() {
	const userId = (
		await (
			await fetch(
				'https://api.twitch.tv/helix/users?login=' +
					(await getStorage('user')),
				{
					headers: {
						'Client-Id': client_id,
						Authorization: 'Bearer ' + token,
					},
				}
			)
		).json()
	).data[0].id;

	const resbJson = await (
		await fetch(
			'https://api.twitch.tv/helix/streams/followed?user_id=' + userId,
			{
				headers: {
					'Client-Id': client_id,
					Authorization: 'Bearer ' + token,
				},
			}
		)
	).json();

	chrome.browserAction.setBadgeText({
		text: resbJson.data.length.toString(),
	});

	setStorageLocal('channels', resbJson.data);
}

async function getChannelInfoInit() {
	getChannelInfo();
	return setInterval(async () => getChannelInfo(), 60000);
}

getChannelInfoInit();
