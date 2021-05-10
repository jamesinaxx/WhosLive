chrome.runtime.onInstalled.addListener(() => {
	console.log('Initialized chrome extension');
});

module.exports = { setStorage, getStorage };
