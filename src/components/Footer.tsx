import React from 'react';
import { ButtonGroup, Button, TextField } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import { setStorage } from '../../public/chrome/scripts/background';
import axios from 'axios';

import { client_id, token } from '../../public/config';

interface IProps {
	handleChange: (page: string) => void;
}

export default class Footer extends React.Component<IProps> {
	getFollowing(user_id: string) {
		axios
			.get('https://api.twitch.tv/helix/users/follows', {
				params: { from_id: user_id, first: 100 },
				headers: {
					'Client-Id': client_id,
					Authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				console.log(res.data.data);
				console.log('Just sent a request for the user: ' + user_id);
				setStorage(res.data.data.map((channel) => channel.to_name));
			})
			.catch((e) => console.error(e));
	}

	render() {
		return (
			<footer style={{ backgroundColor: '#FFF' }}>
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
					<Button
						onClick={() => {
							this.getFollowing('538134305');
						}}>
						<SettingsIcon />
					</Button>
				</ButtonGroup>
			</footer>
		);
	}
}
