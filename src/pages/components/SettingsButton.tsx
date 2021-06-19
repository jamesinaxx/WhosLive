import React from 'react';
import styles from '../../styles/layout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function SettingsButton({
	ruSure,
	shown,
}: {
	ruSure: () => void;
	shown: boolean;
}) {
	return (
		<button
			className={styles.settingsButton}
			onClick={ruSure}
			style={{ opacity: shown ? '0%' : '100%' }}
		>
			<FontAwesomeIcon icon={faSignOutAlt} />
		</button>
	);
}
