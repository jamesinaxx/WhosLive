import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss';
import Live from './pages/Live';
import SettingsButton from './pages/components/SettingsButton';
import styles from './styles/layout.module.scss';
import { getStorage, setStorage } from './lib/chromeapi';
import NoAuthPage from './pages/NoAuth';
import validateToken from './lib/tokenValid';
import { Button, ButtonGroup } from '@material-ui/core';
import Loading from './pages/components/Loading';
import axios from 'axios';

// eslint-disable-next-line no-undef
const client_id = process.env.DEVCLIENTID || process.env.CLIENTID;

class Main extends React.Component<
	any,
	{ userToken: string; tokenValid: boolean; showRUSure: boolean }
> {
	constructor(props: any) {
		super(props);

		this.state = {
			userToken: undefined,
			tokenValid: true,
			showRUSure: false,
		};

		this.validateToken = this.validateToken.bind(this);
		this.showRUSure = this.showRUSure.bind(this);
		this.invalidateToken = this.invalidateToken.bind(this);
	}

	componentDidMount() {
		this.validateToken();

		// eslint-disable-next-line no-undef
		chrome.storage.onChanged.addListener(() => this.validateToken());
	}

	validateToken = () =>
		getStorage('twitchtoken').then(res =>
			validateToken(res).then(valid =>
				valid
					? this.setState({ userToken: res, tokenValid: valid })
					: this.setState({ userToken: null, tokenValid: valid })
			)
		);

	showRUSure = () => this.setState({ showRUSure: true });

	invalidateToken() {
		getStorage('twitchtoken').then(token => {
			axios.post('https://id.twitch.tv/oauth2/revoke', null, {
				params: { client_id, token },
			});
		});
		setStorage('twitchtoken', '');
		this.validateToken();
		this.setState({
			showRUSure: false,
			userToken: undefined,
			tokenValid: false,
		});
	}

	render() {
		if (this.state.userToken === undefined) {
			return <Loading hidden={false} />;
		}

		return (
			<div>
				{this.state.userToken && this.state.tokenValid ? (
					<>
						{this.state.showRUSure ? (
							<div
								className={styles.ruSure}
								style={{
									opacity: this.state.showRUSure
										? '100%'
										: '0%',
								}}
							>
								<h1
									style={{
										opacity: this.state.showRUSure
											? '100%'
											: '0%',
									}}
								>
									Are you sure you want to invalidate the
									Twitch token?{' '}
								</h1>
								<ButtonGroup variant='contained'>
									<Button onClick={this.invalidateToken}>
										Yes
									</Button>
									<Button
										color='primary'
										onClick={() =>
											this.setState({
												showRUSure: false,
											})
										}
									>
										No
									</Button>
								</ButtonGroup>
							</div>
						) : (
							<div>{null}</div>
						)}
						<Live />
						<SettingsButton
							ruSure={this.showRUSure}
							shown={this.state.showRUSure}
						/>
					</>
				) : (
					<NoAuthPage />
				)}
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));

export { client_id };
