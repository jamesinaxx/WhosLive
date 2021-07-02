// eslint-disable-next-line no-undef
const Chrome = chrome;
const client_id = '6ucdumdkn0j562bf9oog38efzmx4vh';
import 'regenerator-runtime/runtime';
import { setStorage, getChannelInfo } from '@lib/chromeapi';

function twitchtoken(): Promise<string | undefined> {
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
}

Chrome.runtime.onInstalled.addListener(async () => {
	setStorage('mode', 'dark');
	console.log('Initialized Now Live');
});

Chrome.storage.onChanged.addListener(async () =>
	getChannelInfo(client_id, twitchtoken)
);

(function () {
	getChannelInfo(client_id, twitchtoken);
	return setInterval(
		async () => getChannelInfo(client_id, twitchtoken),
		60000
	);
})();
