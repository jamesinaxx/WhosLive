const queryString = window.location.hash.replace('#', '?');
const urlParams = new URLSearchParams(queryString);
const client_id = '6ucdumdkn0j562bf9oog38efzmx4vh';
const redirect_uri = 'http://localhost:3984/docs';

const authUrl = new URL('https://id.twitch.tv/oauth2/authorize');

authUrl.searchParams.append('client_id', client_id);
authUrl.searchParams.append('redirect_uri', redirect_uri);
authUrl.searchParams.append('response_type', 'token');
authUrl.searchParams.append('scope', 'user:read:follows');

if (!urlParams.has('access_token')) window.open(authUrl.href);
else {
	console.log(window.location.hash);
	document.body.append(
		document.createTextNode(urlParams.get('access_token'))
	);
}
