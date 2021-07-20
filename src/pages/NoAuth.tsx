import React from 'react';
import styles from '@styles/layout.module.scss';
import 'regenerator-runtime/runtime';

export default function NoAuth() {
	return (
		<small className={styles.noAuth}>
			You are not logged in to Twitch! Please go to{' '}
			<a
				href='https://nowlive.jamesinaxx.me/auth/'
				target='_blank'
				rel='noreferrer'>
				this page
			</a>
			, log in with Twitch, and then come back here.
		</small>
	);
}
