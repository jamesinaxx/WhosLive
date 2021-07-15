const authEl = document.getElementById('NowLiveAuthTokenElement');
console.log('Initialized content script');
const hash = window.location.hash.substr(1);
const result = hash.split('&').reduce((res: any, item) => {
	var parts = item.split('=');
	res[parts[0]] = parts[1];
	return res;
}, {});

window.location.hash = '';

const authParent = authEl?.parentElement?.parentElement;

chrome.runtime.sendMessage({
	name: 'NowLiveAuthToken',
	token: result.access_token,
});

if (authParent !== null && authParent !== undefined) {
	authParent.innerText = 'Thank you :) Re-open NowLive to start using it';
}
