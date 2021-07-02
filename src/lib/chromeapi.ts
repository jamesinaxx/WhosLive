import { print } from '@lib/print';
// eslint-disable-next-line no-undef
const Chrome = chrome;

function setStorage(key: string, value: any): void {
	Chrome.storage.sync.set({ [key]: value }, () => {
		print(`Set ${key} in synced chrome storage`);
	});
}

function getStorage(key: string): Promise<any> {
	return new Promise(resolve => {
		Chrome.storage.sync.get([key], res => {
			print(`Got ${key} from synced chrome storage`);
			resolve(res[key]);
		});
	});
}

function setStorageLocal(key: string, value: any): void {
	Chrome.storage.local.set({ [key]: value }, () => {
		print(`Set ${key} in local chrome storage`);
	});
}

function getStorageLocal(key: string): Promise<any> {
	return new Promise(resolve => {
		Chrome.storage.local.get([key], res => {
			print(`Got ${key} from local chrome storage`);
			resolve(res[key]);
		});
	});
}

export { setStorage, getStorage, setStorageLocal, getStorageLocal };
