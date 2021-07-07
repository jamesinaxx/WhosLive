const el = document.getElementById('NowLiveExtensionInstalledOrNotText');

if (el !== undefined) {
	(el as HTMLParagraphElement).innerHTML =
		'Thank you so much for installing Now Live! Consider leaving feedback <a href="https://github.com/jamesinaxx/NowLive/issues">here</a>';
}
