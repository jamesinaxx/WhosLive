import 'regenerator-runtime/runtime';
import { setStorage, getChannelInfo } from '@lib/chromeapi';
import validateToken from '@lib/tokenValid';

chrome.alarms.create('NowLive:Refresh', { delayInMinutes: 1 });

getChannelInfo();
chrome.alarms.onAlarm.addListener(async alarm => {
	if (alarm.name === 'NowLive:Refresh') {
		getChannelInfo();
	}
});

chrome.runtime.onInstalled.addListener(async () => {
	setStorage('mode', 'dark');
	console.log('Initialized Now Live');
});

chrome.storage.onChanged.addListener(async () => {
	getChannelInfo();
});

chrome.runtime.onMessage.addListener((message, sender, res) => {
	if (
		sender.url?.split('#')[0] !==
		'https://nowlive.jamesinaxx.me/auth/callback'
	)
		return;

	if (
		typeof message === 'object' &&
		message.name === 'NowLive:Storage:Token' &&
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
