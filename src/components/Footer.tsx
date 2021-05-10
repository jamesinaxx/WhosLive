import React from 'react';
import { ButtonGroup, Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import {
	setStorage,
	getStorage,
} from '../../public/chrome/scripts/chromeapi.js';
import axios from 'axios';
import { client_id, token } from '../../public/config';

interface FooterProps {
	// eslint-disable-next-line no-unused-vars
	handleChange: (page: string) => void;
}

interface FooterState {
	textVal: string;
	textErr: boolean;
}

const UsernameTextField = withStyles({
	root: {
		'& input:valid + fieldset': {
			borderColor: 'green',
			borderWidth: 2,
		},
		'& input:invalid + fieldset': {
			borderColor: 'red',
			borderWidth: 2,
		},
	},
})(TextField);

export default class Footer extends React.Component<FooterProps, FooterState> {
	constructor(props: FooterProps) {
		super(props);

		this.state = { textVal: '', textErr: false };
	}

	getFollowing(username: string) {
		setStorage('user', username);

		getStorage('user').then((res) => {
			axios
				.get('https://api.twitch.tv/helix/users', {
					params: { login: res, first: 100 },
					headers: {
						'Client-Id': client_id,
						Authorization: 'Bearer ' + token,
					},
				})
				.then((res) => {
					if (!res.data.data.length) {
						this.setState({ textErr: true });
						return;
					}
					axios
						.get('https://api.twitch.tv/helix/users/follows', {
							params: {
								from_id: res.data.data[0].id,
								first: 100,
							},
							headers: {
								'Client-Id': client_id,
								Authorization: 'Bearer ' + token,
							},
						})
						.then((res) => {
							console.log(res.data.data);
							console.log(
								'Just sent a request for the user: ' + username
							);
							setStorage(
								'channels',
								res.data.data.map((channel) => channel.to_name)
							);
						})
						.catch((e) => console.error(e));
				});
		});
	}

	render() {
		return (
			<footer>
				<ButtonGroup variant="outlined" color="primary">
					<Button
						onClick={() => this.props.handleChange('live')}
						startIcon={<VideocamIcon />}>
						Live
					</Button>
					<Button
						onClick={() => this.props.handleChange('offline')}
						startIcon={<VideocamOffIcon />}>
						Offline
					</Button>
					<UsernameTextField
						variant="outlined"
						id="usernamefield"
						value={this.state.textVal}
						error={this.state.textErr}
						required
						label="Twitch Username"
						type="text"
						onChange={(e) =>
							this.setState({ textVal: e.target.value })
						}></UsernameTextField>
					<Button
						onClick={() => {
							this.getFollowing(
								(document.getElementById(
									'usernamefield'
								) as HTMLInputElement).value
							);
						}}>
						<SettingsIcon />
					</Button>
				</ButtonGroup>
			</footer>
		);
	}
}
