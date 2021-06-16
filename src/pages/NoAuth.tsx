import React from 'react';
import { setStorage } from '../lib/chromeapi';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { client_id } from '..';

export default class NoAuthPage extends React.Component<
	any,
	{ inputValue: string; tokenError: boolean }
> {
	constructor(props) {
		super(props);

		this.state = { inputValue: '', tokenError: false };

		this.handleChange = this.handleChange.bind(this);
		this.validateToken = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ inputValue: event.target.value });
	}

	validateToken() {
		const token = this.state.inputValue;
		console.log(token);

		axios
			.get('https://id.twitch.tv/oauth2/validate', {
				headers: {
					Authorization: `Oauth ${client_id}`,
				},
			})
			.then(res => {
				console.log('Finished req ' + res.data);
				if (
					!(
						res.data.scopes.length !== 0 &&
						!(res.data.scopes.length > 1) &&
						res.data.scopes[0] === 'user:read:follows' &&
						res.data.expires_in > 500
					)
				)
					return this.setState({ tokenError: true });
			})
			.catch(res => {
				console.log('Failed req ' + res);
				this.setState({ tokenError: true });
			});
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
					<TextField
						id='twitchTokenInput'
						name='twitchtoken'
						value={this.state.inputValue}
						error={this.state.tokenError}
						onChange={this.handleChange}
						label='Token'
						variant='filled'
					></TextField>
					<Button
						variant='contained'
						color='primary'
						onClick={this.validateToken}
					>
						Submit
					</Button>
				</form>
			</small>
		);
	}
}
