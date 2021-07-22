import 'regenerator-runtime/runtime';
import { setStorage, getChannelInfo } from '@lib/chromeapi';
import validateToken from '@lib/tokenValid';

chrome.alarms.create('NowLiveRefresh', { delayInMinutes: 1 });

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
		message.name === 'NowLiveAuthToken' &&
		typeof message.token === 'string'
	) {
		validateToken(message.token).then(isValid => {
			console.log('fdoigjhiufdjgiufdhgiufhgiufdhguidfhgiudfhgi');
			console.log(sender);
			console.log(sender.url);
			console.log();
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
	getChannelInfo();
	chrome.alarms.onAlarm.addListener(async alarm => {
		if (alarm.name === 'NowLiveRefresh') {
			getChannelInfo();
		}
	});
})();
