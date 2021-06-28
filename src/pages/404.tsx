import React from 'react';
import styles from '../styles/error.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Error404() {
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
					rel='noreferrer'
				>
					this website
				</a>
				.
				<br />
				<br />
				If everything works fine then there is a bug with the extension.
				Please report this{' '}
				<a
					href='https://github.com/jamesinaxx/NowLive/issues'
					target='_blank'
					rel='noreferrer'
				>
					here <FontAwesomeIcon icon={faGithub} />
				</a>
			</p>
		</div>
	);
}
