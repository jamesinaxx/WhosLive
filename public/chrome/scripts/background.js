const client_id = 'r69gvllvchvhsh0zvmg8i518a8zf7e';
const token = 'h0qztx37s7ffbe3onmm45lr4b2h5fu';

chrome.runtime.onInstalled.addListener(async () => {
	console.log('Initialized chrome extension');
});

chrome.storage.onChanged.addListener(async () => getChannelInfo);

function getStorage(key) {
	return new Promise((resolve) => {
		chrome.storage.sync.get([key], (res) => {
			console.log(`Got the ${key} array: ` + res[key]);
			resolve(res[key]);
		});
	});
}

function setStorageLocal(key, value) {
	chrome.storage.local.set({ [key]: value }, () => {
		console.log(`Set the ${key} array to ` + value);
	});
}

async function getChannelInfo() {
	getStorage('user').then(async (userName) =>
		fetch('https://api.twitch.tv/helix/users?login=' + userName, {
			headers: {
				'Client-Id': client_id,
				Authorization: 'Bearer ' + token,
			},
		}).then(async (resa) => {
			console.log('Made first http req to Twitch');
			resa.json().then((resjson) => {
				console.log(resjson);
				fetch(
					'https://api.twitch.tv/helix/streams/followed?user_id=' +
						resjson.data[0].id,
					{
						headers: {
							'Client-Id': client_id,
							Authorization: 'Bearer ' + token,
						},
					}
				)
					.then(async (resb) => {
						const json = await resb.json();
						console.log('Made second http req to Twitch');
						console.log(
							'Just sent a request for the user: ' + '538134305'
						);

						console.log(
							'This should be something like this idfk ' +
								json.data
						);

						chrome.browserAction.setBadgeText({
							text: json.data.length.toString(),
						});

						setStorageLocal('channels', json.data);
					})
					.catch((e) => console.error(e));
			});
		})
	);
}

async function getChannelInfoInit() {
	getChannelInfo();
	return setInterval(async () => getChannelInfo(), 60000);
}

getChannelInfoInit();
