const queryString = window.location.hash.replace('#', '?');
const urlParams = new URLSearchParams(queryString);
const client_id = '6ucdumdkn0j562bf9oog38efzmx4vh';
const redirect_uri = 'http://localhost:3984/docs';

const authUrl = new URL('https://id.twitch.tv/oauth2/authorize');

authUrl.searchParams.append('client_id', client_id);
authUrl.searchParams.append('redirect_uri', redirect_uri);
authUrl.searchParams.append('response_type', 'token');
authUrl.searchParams.append('scope', 'user:read:follows');

function openTwitch() {
	window.open(authUrl.href, '_self');
}

const Button = () =>
	!urlParams.has('access_token') ? (
		<button onClick={openTwitch}>Authorize with Twitch</button>
	) : (
		<p>
			Thank you for authorizing with Twitch! Open the extension on this
			page to use it!
		</p>
	);

ReactDOM.render(<Button />, document.querySelector('.root'));
