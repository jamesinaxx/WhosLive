import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import Live from './pages/Live';
import SettingsButton from './pages/components/SettingsButton';
import { getStorage } from './lib/chromeapi';
import NoAuthPage from './pages/NoAuth';
import validateToken from './lib/tokenValid';

const client_id = '6ucdumdkn0j562bf9oog38efzmx4vh';

class Main extends React.Component<
	any,
	{ userToken: string; tokenValid: boolean }
> {
	constructor(props: any) {
		super(props);

		this.state = {
			userToken: null,
			tokenValid: true,
		};

		this.validateToken = this.validateToken.bind(this);
	}

	componentDidMount() {
		this.validateToken();

		// eslint-disable-next-line no-undef
		chrome.storage.onChanged.addListener(this.validateToken);
	}

	validateToken() {
		getStorage('twitchtoken').then(res => {
			console.log(
				'this is the component mounting code thingo whatever',
				res
			);
			validateToken(res).then(valid => {
				console.log(valid);
				if (valid) this.setState({ userToken: res, tokenValid: valid });
				else this.setState({ userToken: null, tokenValid: valid });
			});
		});
	}

	render() {
		return (
			<div>
				{this.state.userToken && this.state.tokenValid ? (
					<Live />
				) : (
					<NoAuthPage />
				)}
				<SettingsButton />
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));

export { client_id };
