// eslint-disable-next-line no-undef
const Chrome = chrome;

function setStorage(key, value) {
	Chrome.storage.sync.set({ [key]: value }, () => {
		console.log(`Set ${key} in synced chrome storage`);
	});
}

function getStorage(key) {
	return new Promise(resolve => {
		Chrome.storage.sync.get([key], res => {
			console.log(`Got ${key} from synced chrome storage`);
			resolve(res[key]);
		});
	});
}

function setStorageLocal(key, value) {
	Chrome.storage.local.set({ [key]: value }, () => {
		console.log(`Set ${key} in local chrome storage`);
	});
}

function getStorageLocal(key) {
	return new Promise(resolve => {
		Chrome.storage.local.get([key], res => {
			console.log(`Got ${key} from local chrome storage`);
			resolve(res[key]);
		});
	});
}

module.exports = { setStorage, getStorage, setStorageLocal, getStorageLocal };
