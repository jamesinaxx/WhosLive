import React from 'react';
import { ButtonGroup, Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';

import { setStorage, getStorage } from '../../lib/chromeapi';

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

export default class Footer extends React.Component<{}, FooterState> {
	constructor(props: {}) {
		super(props);

		this.state = { textVal: '', textErr: false };
	}

	setUser(username: string) {
		// eslint-disable-next-line no-undef
		chrome.storage.local.clear();
		setStorage('user', username);
	}

	componentDidMount() {
		getStorage('user').then((res: string) =>
			this.setState({ textVal: res })
		);
	}

	render() {
		return (
			<footer>
				<ButtonGroup variant="outlined" color="primary">
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
							this.setUser(
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
