import React from 'react';
import styles from '@styles/error.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import openLink from '@lib/openLink';

const Error404 = () => (
	<div className={styles.container}>
		<h1 className={styles.failedHeader}>Failed to connect to Twitch</h1>
		<p className={styles.description}>
			Please try to troubleshoot your connection and if everything seems
			okay, try going to{' '}
			<a
				href='https://twitch.tv/jamesinaxx'
				target='_blank'
				rel='noreferrer'>
				Twitch
			</a>
			.
			<br />
			<br />
			If Twitch loads fine, then there is a bug with Now Live. Please
			report this{' '}
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

export default Error404;
