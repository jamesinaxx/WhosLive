// eslint-disable-next-line no-undef
const Chrome = chrome;

function setStorage(key, value) {
	Chrome.storage.sync.set({ [key]: value }, () => {
		console.log(`Set the ${key} array to ` + value);
	});
}

function getStorage(key) {
	return new Promise((resolve, reject) => {
		Chrome.storage.sync.get([key], (res) => {
			console.log(`Got the ${key} array: ` + res[key]);
			resolve(res[key]);
		});
	});
}

export { setStorage, getStorage };
