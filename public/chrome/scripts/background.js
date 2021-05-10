chrome.runtime.onInstalled.addListener(() => {
	console.log('Initialized chrome extension');
});

function setStorage(channels) {
	chrome.storage.sync.set({ channels }, () => {
		console.log('Set the channels array to ' + channels);
	});
}

function getStorage(channels) {
	chrome.storage.sync.get(['channels'], () => {
		console.log('Set the channels array to ' + channels);
	});
}

module.exports = { setStorage, getStorage };
