import { MouseEvent } from 'react';

/**
 *
 * Mouse Button Reference:
 *
 * 0: No button
 * 1: Left click
 * 2: Right click
 * 4: Middle click
 * 8: Back button
 * 16: Forward button
 */

// Literally just a function that allows me to write opening link code once and call it as many times as I like
export default function openLink(
	event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
	url: string,
	target?: string | undefined,
	features?: string | undefined,
	replace?: boolean | undefined
) {
	console.log('clicked');
	console.log(event.button);
	window.chrome.tabs.getCurrent().then(tab => {
		if (tab.url === undefined) {
			window.open(url, target || '_self', features, replace);
			return;
		}
		window.open(url, target || '_blank', features, replace);
	});
}
