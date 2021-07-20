import 'regenerator-runtime/runtime';
const client_id = process.env.CLIENTID || '';
import { setStorage, getChannelInfo } from '@lib/chromeapi';
import validateToken from '@/lib/tokenValid';

chrome.alarms.create('NowLiveRefresh', { delayInMinutes: 1 });

chrome.runtime.onInstalled.addListener(async () => {
	setStorage('mode', 'dark');
	console.log('Initialized Now Live');
});

chrome.storage.onChanged.addListener(async () => {
	getChannelInfo(client_id);
});

chrome.runtime.onMessage.addListener((message, _sender, res) => {
	if (
		typeof message === 'object' &&
		message.name === 'NowLiveAuthToken' &&
		typeof message.token === 'string'
	) {
		validateToken(message.token).then(isValid => {
			if (isValid) {
				res(['Received valid token: ' + message.token, true]);
			} else {
				res(['Received invalid token: ' + message.token, false]);
			}
		});
	} else {
		res(['Received invalid message object: ' + message, false]);
	}
	return true;
});

(async () => {
	getChannelInfo(client_id);
	chrome.alarms.onAlarm.addListener(async alarm => {
		if (alarm.name === 'NowLiveRefresh') {
			getChannelInfo(client_id);
		}
	});
})();
