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

chrome.alarms.create('NowLiveRefresh', { delayInMinutes: 1 });

chrome.runtime.onInstalled.addListener(async () => {
	setStorage('mode', 'dark');
	console.log('Initialized Now Live');
});

chrome.storage.onChanged.addListener(async () => {
	getChannelInfo(client_id, twitchtoken);
});

chrome.runtime.onMessage.addListener((message, _sender, res) => {
	if (typeof message === 'object') {
		if (message.name !== undefined && message.token !== undefined) {
			validateToken(message.token).then(isValid => {
				if (isValid) {
					res(['Received valid token: ' + message.token, true]);
				} else {
					res(['Received invalid token: ' + message.token, false]);
				}
			});
		} else {
			res(['Received message object: ' + message, false]);
		}
	} else {
		res(['Received message object: ' + message, false]);
	}
	return true;
});

(async () => {
	getChannelInfo(client_id, twitchtoken);
	chrome.alarms.onAlarm.addListener(async alarm => {
		if (alarm.name === 'NowLiveRefresh') {
			getChannelInfo(client_id, twitchtoken);
		}
	});
})();
