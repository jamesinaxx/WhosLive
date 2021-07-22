// Content script that sends the token from the webpage to the extension
console.log('Initialized content script from Now Live');

const authEl = document.getElementById('NowLiveAuthText');
const hash = window.location.hash.substr(1);
const hashResult = hash.split('&').reduce((res: any, item) => {
	var parts = item.split('=');
	res[parts[0]] = parts[1];
	return res;
}, {});

history.pushState(
	'',
	document.title,
	window.location.pathname + window.location.search
);

chrome.runtime.sendMessage(
	{
		name: 'NowLiveAuthToken',
		token: hashResult.access_token,
	},
	(res: [string, boolean]) => {
		const success = res[1];
		if (authEl !== null && authEl !== undefined && !success) {
			authEl.innerHTML = `<p style="color: red">We tried to send the token, but something went wrong... Please let me know <a href="https://github.com/jamesinaxx/NowLive/issues" style="color: #05d1d1">here</a> and include ${res[0]}</p>`;
		}
		console.log(res[0]);
	}
);
