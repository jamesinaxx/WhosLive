import React from 'react';
import { Button, Input } from '@material-ui/core';
import { getStorage } from '../lib/chromeapi';
import validateToken from '../lib/tokenValid';

export default class NoAuthPage extends React.Component<
	any,
	{ inputValue: string; tokenError: boolean }
> {
	constructor(props) {
		super(props);

		this.state = {
			inputValue: '',
			tokenError: true,
		};

		this.handleChange = this.handleChange.bind(this);
		this.keyPress = this.keyPress.bind(this);
		this.validateTokenBased = this.validateTokenBased.bind(this);
	}

	componentDidMount() {
		getStorage('twitchtoken').then(res => {
			validateToken(res).then(valid => {
				this.setState({ inputValue: res, tokenError: !valid });
			});
		});
	}

	keyPress(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
			this.validateTokenBased(e.target.value);
		}
	}

	validateTokenBased(token) {
		validateToken(token).then(tokenError =>
			this.setState({ tokenError: !tokenError })
		);
	}

	handleChange(event) {
		this.setState({ inputValue: event.target.value });
	}

	render() {
		return (
			<small>
				You are not verified! Please go to{' '}
				<a
					href='https://jamesinaxx.me/auth/twitchauth'
					target='_blank'
					rel='noreferrer'
				>
					this page
				</a>{' '}
				and then open this again
				<form>
					<Input
						type='text'
						id='twitchTokenInput'
						name='twitchtoken'
						value={this.state.inputValue}
						error={this.state.tokenError}
						disabled={!this.state.tokenError}
						onChange={this.handleChange}
						onKeyDown={this.keyPress}
						placeholder='Twitch Token'
					/>
					<Button
						variant='contained'
						color='primary'
						disabled={!this.state.tokenError}
						onClick={() =>
							this.validateTokenBased(
								(
									document.getElementById(
										'twitchTokenInput'
									) as HTMLInputElement
								).value
							)
						}
					>
						Submit
					</Button>
				</form>
			</small>
		);
	}
}
