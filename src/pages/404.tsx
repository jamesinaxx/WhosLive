import React from 'react';
import styles from '../styles/error.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import openLink from '../lib/openLink';

export default function Error404() {
	console.log(document.body.style.backgroundColor);

	return (
		<div className={styles.container}>
			<h1 className={styles.failedHeader}>Failed to connect to Twitch</h1>
			<p className={styles.description}>
				This could occur for a number of reasons, the most likely of
				which is you do not have internet. Please troubleshoot your
				connection and if everything seems okay, try going to{' '}
				<a
					href='https://twitch.tv/jamesinaxx'
					target='_blank'
					rel='noreferrer'>
					Twitch
				</a>
				.
				<br />
				<br />
				If everything works fine then there is a bug with the extension.
				Please report this{' '}
				<a
					onClick={event => {
						openLink(
							event,
							'https://github.com/jamesinaxx/NowLive/issues'
						);
					}}>
					here{' '}
					<FontAwesomeIcon
						icon={faGithub}
						style={{
							color:
								document.body.style.backgroundColor ===
								'rgb(255, 255, 255)'
									? '#000'
									: '#fff',
						}}
					/>
				</a>
			</p>
		</div>
	);
}
