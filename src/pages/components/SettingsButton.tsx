import React from 'react';
import styles from '../../styles/layout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

interface SettingsButtonProps {
	ruSure: () => void;
	shown: boolean;
	colorMode?: string;
}

export default function SettingsButton({
	ruSure,
	shown,
	colorMode,
}: SettingsButtonProps) {
	return (
		<button
			className={styles.settingsButton}
			onClick={ruSure}
			style={{
				opacity: shown ? '0%' : '100%',
				color: (colorMode || 'dark') === 'dark' ? '#fff' : '#000',
			}}
		>
			<FontAwesomeIcon icon={faSignOutAlt} />
		</button>
	);
}
