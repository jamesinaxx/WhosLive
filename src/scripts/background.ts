import init, { initialize } from 'image-helpers';
import {
  getChannelInfo,
  setStorageIfNull,
  setStorageLocalIfNull,
} from '../lib/chromeapi';
import { log } from '../lib/logger';
import validateToken from '../lib/validateToken';

const initializeWasm = async () => {
  await init();
  initialize();
};

chrome.alarms.create('NowLive:Refresh', {
  // delayInMinutes: 1,
  periodInMinutes: 1,
});

chrome.runtime.onInstalled.addListener(async () => {
  await setStorageLocalIfNull('NowLive:Theme', 'dark');
  await setStorageIfNull('NowLive:Favorites', []);
  await getChannelInfo();
  log('Initialized Now Live');
});

// chrome.storage.onChanged.addListener((changes) => {
// });

chrome.runtime.onMessage.addListener((message, sender, res) => {
  if (!sender.url?.startsWith('https://nowlive.jewelexx.com/auth/callback')) {
    return false;
  }

  if (
    typeof message === 'object' &&
    message.name === 'NowLive:Token' &&
    typeof message.token === 'string'
  ) {
    validateToken(message.token).then((valid) => {
      if (valid) {
        res([`Received valid token: ${message.token}`, true]);
        getChannelInfo();
      } else {
        res([`Received invalid token: ${message.token}`, false]);
      }
    });
  } else {
    res([`Received invalid message object: ${message}`, false]);
  }
  return true;
});

(async () => {
  await initializeWasm();

  chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'NowLive:Refresh') {
      await getChannelInfo();
    }
  });
})();
