import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import { ChromeReaderMode } from '@material-ui/icons';
import { setStorage } from '../../public/chrome/scripts/background';

interface IProps {
	handleChange: (page: string) => void;
}

export default class Footer extends React.Component<IProps> {
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
					<Button
						onClick={() => {
							console.log(
								'I will implement this at some point I promise'
							);
							setStorage(['jamesinaxx', 'kinzixx', 'ludwig']);
						}}>
						<SettingsIcon />
					</Button>
				</ButtonGroup>
			</footer>
		);
	}
}
