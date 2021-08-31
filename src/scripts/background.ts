import 'regenerator-runtime';
import { setStorage, getChannelInfo } from '../lib/chromeapi';
import validateToken from '../lib/validateToken';

chrome.alarms.create('NowLive:Refresh', { delayInMinutes: 1 });

async function onInstalled() {
  setStorage('NowLive:Storage:Color', 'dark');
  console.log('Initialized Now Live');
}

chrome.runtime.onInstalled.addListener(onInstalled);

chrome.storage.onChanged.addListener(async () => {
  getChannelInfo();
});

chrome.runtime.onMessage.addListener((message, sender, res) => {
  if (
    sender.url?.split('#')[0] !== 'https://nowlive.jamesinaxx.me/auth/callback'
  ) {
    return false;
  }

  if (
    typeof message === 'object' &&
    message.name === 'NowLive:Storage:Token' &&
    typeof message.token === 'string'
  ) {
    validateToken(message.token).then(isValid => {
      if (isValid) {
        res([`Received valid token: ${message.token}`, true]);
      } else {
        res([`Received invalid token: ${message.token}`, false]);
      }
    });
  } else {
    res([`Received invalid message object: ${message}`, false]);
  }
  return true;
});

async function init() {
  console.log('Initialized background script');
  await getChannelInfo();
  chrome.alarms.onAlarm.addListener(async alarm => {
    if (alarm.name === 'NowLive:Refresh') {
      await getChannelInfo();
    }
  });
}

init();
