// eslint-disable-next-line no-undef
const Chrome = chrome;
const client_id = '6ucdumdkn0j562bf9oog38efzmx4vh';

const twitchtoken = () => {
	return new Promise(resolve =>
		Chrome.storage.sync.get(['twitchtoken'], res => {
			if (res.twitchtoken === undefined) {
				Chrome.storage.sync.set({ twitchtoken: undefined });
				resolve(undefined);
			} else {
				resolve(res.twitchtoken);
			}
		})
	);
};

Chrome.runtime.onInstalled.addListener(async () => {
	console.log('Initialized Chrome extension');
});

Chrome.storage.onChanged.addListener(async () => getChannelInfo);

async function setStorage(key: string, value: string, callback?: () => void) {
	Chrome.storage.sync.set({ [key]: value }, callback);
}

async function getStorage(key: string) {
	return new Promise(resolve => {
		Chrome.storage.sync.get([key], res => {
			resolve(res[key]);
		});
	});
}

function setStorageLocal(key: string, value: any) {
	Chrome.storage.local.set({ [key]: value });
}

async function getChannelInfo() {
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

		const resbJson = await (
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

function init() {
	setStorage(
		'mode',
		window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	);

	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', e => {
			const newColorScheme = e.matches ? 'dark' : 'light';

			setStorage('mode', newColorScheme);
		});
	getChannelInfo();
	return setInterval(async () => getChannelInfo(), 60000);
}

init();
