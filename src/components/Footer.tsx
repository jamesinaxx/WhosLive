import React from 'react';
import { ButtonGroup, Button, TextField } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import { setStorage, getStorage } from '../../public/chrome/scripts/background';
import axios from 'axios';

import { client_id, token } from '../../public/config';

interface IProps {
	handleChange: (page: string) => void;
}

export default class Footer extends React.Component<IProps> {
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
				<ButtonGroup variant="outlined" color="secondary">
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
					{/* TODO: Move to text field instead of button*/}
					<TextField
						variant="outlined"
						color="secondary"
						id="usernamefield"></TextField>
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
