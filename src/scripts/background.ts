import 'regenerator-runtime/runtime';
const client_id = process.env.CLIENTID || '';
import { setStorage, getChannelInfo } from '@lib/chromeapi';
import validateToken from '@/lib/tokenValid';

async function twitchtoken(): Promise<string | undefined> {
	return new Promise(resolve =>
		chrome.storage.sync.get(['twitchtoken'], async res => {
			if (res.twitchtoken === undefined) {
				chrome.storage.sync.set({ twitchtoken: undefined });
				resolve(undefined);
			} else {
				resolve(res.twitchtoken);
			}
		})
	);
}

chrome.alarms.create({ delayInMinutes: 1 });

chrome.runtime.onInstalled.addListener(async () => {
	setStorage('mode', 'dark');
	console.log('Initialized Now Live');
});

chrome.storage.onChanged.addListener(async () =>
	getChannelInfo(client_id, twitchtoken)
);

chrome.runtime.onMessage.addListener(async message => {
	if (typeof message === 'object') {
		if (message.name !== undefined && message.token !== undefined) {
			console.log(message.token);
			await validateToken(message.token);
		}
	}
});

(async () => {
	getChannelInfo(client_id, twitchtoken);
	chrome.alarms.onAlarm.addListener(async () => {
		getChannelInfo(client_id, twitchtoken);
	});
})();
