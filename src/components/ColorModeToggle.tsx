import React from 'react';
import styles from '@styles/layout.module.scss';
import { DarkModeIcon, LightModeIcon } from './Icons';

interface ToggleProps {
	icon: string;
}

function ColorToggleIcon({ icon }: ToggleProps) {
	return (
		<>
			<LightModeIcon
				style={{
					opacity: icon === 'light' ? '100%' : '0%',
					position: 'absolute',
				}}
			/>
			<DarkModeIcon
				style={{ opacity: icon === 'dark' ? '100%' : '0%' }}
			/>
		</>
	);
}

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
			<ColorToggleIcon icon={mode} />
		</button>
	);
}
