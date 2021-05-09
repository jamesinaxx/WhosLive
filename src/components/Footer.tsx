import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';

export default function Footer() {
	return (
		<footer>
			<ButtonGroup variant="outlined" color="secondary">
				<Button startIcon={<VideocamIcon />}>Live</Button>
				<Button startIcon={<VideocamOffIcon />}>Offline</Button>
				<Button>
					<SettingsIcon />
				</Button>
			</ButtonGroup>
		</footer>
	);
}
