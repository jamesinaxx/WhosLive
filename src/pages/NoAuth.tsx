import React, { useState } from 'react';
import { setStorage } from '../lib/chromeapi';

export default function NoAuthPage() {
	const [TabUrl, setTabUrl] = useState('');

	chrome.tabs.query({ currentWindow: true, active: true }, (tab) => {
		if (tab[0].url.includes('localhost:3984'))
			setTabUrl(tab[0].url.replace('#', '?'));
	});

	const queryString = TabUrl.substring(TabUrl.indexOf('?'));
	const urlParams = new URLSearchParams(queryString);

	if (urlParams.has('access_token')) {
		setStorage('userToken', urlParams.get('access_token'));
		console.log('Pog?');
		return (
			<small>
				Thank you for authorizing! Close and re-open the extension to
				use it!
			</small>
		);
	} else {
		return (
			<small>
				You are not verified! Please go to{' '}
				<a
					href="http://localhost:3984/docs"
					target="_blank"
					rel="noreferrer">
					this page
				</a>{' '}
				and then open this again
			</small>
		);
	}
}
