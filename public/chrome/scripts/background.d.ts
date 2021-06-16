declare function getChannelInfo(): NodeJS.Timeout;

declare function setStorage(
	key: string,
	value: string,
	callback: (key: string, value: any) => void
): NodeJS.Timeout;
