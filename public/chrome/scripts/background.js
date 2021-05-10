chrome.runtime.onInstalled.addListener(() => {
	console.log('Initialized chrome extension');
});

function setStorage(channels) {
	chrome.storage.sync.set({ channels }, () => {
		console.log('Set the channels array to ' + channels);
	});
}

function getStorage() {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get(['channels'], (res) => {
			console.log('Got the channels array: ' + res.channels);
			resolve(res.channels);
		});
	});
}

chrome.storage.onChanged.addListener(function () {
	console.log('Updated storage, logged from background.js');
});

module.exports = { setStorage, getStorage };
