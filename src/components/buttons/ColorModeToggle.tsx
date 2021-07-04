import React from 'react';
import styles from '@styles/layout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';

interface SettingsButtonProps {
	toggleColor: () => void;
	shown: boolean;
	mode: string;
}

export default function SettingsButton({
	toggleColor,
	shown,
	mode,
}: SettingsButtonProps) {
	return (
		<button
			className={styles.colorModeToggle}
			onClick={toggleColor}
			style={{ opacity: shown ? '0%' : '100%' }}>
			<FontAwesomeIcon icon={mode === 'light' ? faSun : faMoon} />
		</button>
	);
}
