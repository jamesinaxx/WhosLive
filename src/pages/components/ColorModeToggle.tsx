import React from 'react';
import styles from '../../styles/layout.module.scss';
import ColorToggleIcon from './Icons';

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
			style={{ opacity: shown ? '0%' : '100%' }}
		>
			<ColorToggleIcon icon={mode} />
		</button>
	);
}
