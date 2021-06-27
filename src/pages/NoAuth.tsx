import React from 'react';
import styles from '../styles/layout.module.scss';
import { Button, TextField, Paper } from '@material-ui/core';
import { getStorage } from '../lib/chromeapi';
import validateToken from '../lib/tokenValid';

interface NoAuthState {
	inputValue: string;
	tokenError: boolean;
}

interface NoAuthProps {
	colorMode?: string;
}

export default class NoAuth extends React.Component<NoAuthProps, NoAuthState> {
	constructor(props: NoAuthProps) {
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

	keyPress(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key == 'Enter') {
			event.preventDefault();
			this.validateTokenBased(
				(
					document.getElementById(
						'twitchTokenInput'
					) as HTMLInputElement
				).value
			);
		}
	}

	validateTokenBased(token: string) {
		validateToken(token).then(tokenError =>
			this.setState({ tokenError: !tokenError })
		);
	}

	handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ inputValue: event.target.value });
	}

	render() {
		return (
			<small className={styles.noAuth}>
				You are not verified! Please go to{' '}
				<a
					href='https://jamesinaxx.me/auth/twitchauth'
					target='_blank'
					rel='noreferrer'
				>
					this page
				</a>{' '}
				and copy and paste the token here
				<Paper
					elevation={3}
					component='form'
					className={styles.form}
					style={{
						background:
							this.props.colorMode === 'dark'
								? '#161617'
								: '#F0F0FF',
					}}
				>
					<TextField
						id='twitchTokenInput'
						variant='outlined'
						required
						name='twitchtoken'
						value={this.state.inputValue}
						error={this.state.tokenError}
						disabled={!this.state.tokenError}
						onChange={this.handleChange}
						onKeyDown={this.keyPress}
						placeholder='Twitch Token'
						color='primary'
						InputProps={{
							style: {
								transition: 'color 100ms ease-in-out',
								color:
									this.props.colorMode === 'dark'
										? '#fff'
										: '#000',
							},
						}}
					/>{' '}
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
				</Paper>
			</small>
		);
	}
}
