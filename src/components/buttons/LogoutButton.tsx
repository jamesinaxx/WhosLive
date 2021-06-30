import React from 'react';
import styles from '@styles/layout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

interface LogoutButtonProps {
	ruSure: () => void;
	shown: boolean;
	colorMode?: string;
}

export default function LogoutButton({ ruSure, shown }: LogoutButtonProps) {
	return (
		<button
			className={styles.settingsButton}
			onClick={ruSure}
			style={{
				opacity: shown ? '0%' : '100%',
				color: '#fff',
			}}>
			<FontAwesomeIcon icon={faSignOutAlt} />
		</button>
	);
}
