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

const TwitchIcon = () => (
	<img src="./TwitchGlitchPurple.svg" width="24px" height="24px"></img>
);

const Button = () => (
	<div className="twitchLogin">
		{!urlParams.has('access_token') ? (
			<p>
				Click here to{' '}
				<button onClick={openTwitch}>
					Login with Twitch{' '}
					<i>
						<TwitchIcon />
					</i>
				</button>
			</p>
		) : (
			<p>
				Thank you for authorizing with Twitch! Open the extension on
				this page to begin using it!
			</p>
		)}
	</div>
);

ReactDOM.render(<Button />, document.querySelector('.root'));
