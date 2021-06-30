import React from 'react';
import styles from '@styles/layout.module.scss';
import { ButtonGroup, Button } from '@material-ui/core';

export default function InvalidateToken({
	show,
	invalidateToken,
}: {
	show: any;
	invalidateToken: any;
}) {
	document.body.style.overflow = 'hidden';

	return (
		<div
			className={styles.ruSure}
			style={{
				opacity: '100%',
			}}>
			<h1
				style={{
					opacity: '100%',
				}}>
				Are you sure you want to invalidate the Twitch token?{' '}
			</h1>
			<ButtonGroup variant='contained'>
				<Button onClick={invalidateToken}>Yes</Button>
				<Button color='primary' onClick={show}>
					No
				</Button>
			</ButtonGroup>
		</div>
	);
}
