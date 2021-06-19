import React from 'react';
import { Button } from '@material-ui/core';

export default class SettingsButton extends React.Component {
	render() {
		return (
			<Button
				variant='outlined'
				color='primary'
				style={{
					maxWidth: '30px',
					maxHeight: '30px',
					minWidth: '30px',
					minHeight: '30px',
					position: 'fixed',
					top: '5px',
					right: '5px',
					backgroundColor: '#000',
				}}
			>
				<span className='material-icons'>{null}settings</span>
			</Button>
		);
	}
}
