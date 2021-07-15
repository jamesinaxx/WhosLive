const authEl = document.getElementById('NowLiveAuthText');
console.log('Initialized content script from Now Live');
const hash = window.location.hash.substr(1);
const result = hash.split('&').reduce((res: any, item) => {
	var parts = item.split('=');
	res[parts[0]] = parts[1];
	return res;
}, {});

// window.location.hash = '';

chrome.runtime.sendMessage(
	{
		name: 'NowLiveAuthToken',
		token: result.access_token,
	},
	(res: [string, boolean]) => {
		const [_msg, success] = res;

		if (authEl !== null && authEl !== undefined && !success) {
			authEl.innerHTML =
				'<p style="color: red">We tried to send the token, but something went wrong... Please let me know <a href="https://github.com/jamesinaxx/NowLive/issues" style="color: #05d1d1">here</a></p>';
		}
	}
);
