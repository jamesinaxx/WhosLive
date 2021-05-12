declare function setStorage(key, value): void;

declare function getStorage(key): Promise<any>;

declare function setStorageLocal(key, value): void;

declare function getStorageLocal(key): Promise<any>;

export { setStorage, getStorage, setStorageLocal, getStorageLocal };
