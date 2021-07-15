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

chrome.runtime.sendMessage(
	{
		name: 'NowLiveAuthToken',
		token: result.access_token,
	},
	(res: [string, boolean]) => {
		const [msg, success] = res;

		if (authParent !== null && authParent !== undefined) {
			authParent.innerHTML = success
				? '<h1>Thank you :) Re-open NowLive to start using it</h1>'
				: '<h1>We tried to send the token, but something went wrong... Please let me know <a href="https://github.com/jamesinaxx/NowLive/issues">here</a></h1>';
		}
		console.log(`Received ${msg} in response to message`);
	}
);
