chrome.runtime.onInstalled.addListener(() => {
	console.log('Initialized chrome extension');
});

function setStorage(key, value) {
	chrome.storage.sync.set({ [key]: value }, () => {
		console.log(`Set the ${key} array to ` + value);
	});
}

function getStorage(key) {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get([key], (res) => {
			console.log(`Got the ${key} array: ` + res[key]);
			resolve(res[key]);
		});
	});
}

chrome.storage.onChanged.addListener(function () {
	console.log('Updated storage, logged from background.js');
});

module.exports = { setStorage, getStorage };
