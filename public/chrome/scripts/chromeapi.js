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

module.exports = { setStorage, getStorage };
