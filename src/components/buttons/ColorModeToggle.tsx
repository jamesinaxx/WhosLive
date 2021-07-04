import React from 'react';
import styles from '@styles/layout.module.scss';
import { DarkModeIcon, LightModeIcon } from '@components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';

interface ToggleProps {
	icon: string;
}

// function ColorToggleIcon({ icon }: ToggleProps) {
// 	return (
// 		<>
// 			<LightModeIcon
// 				style={{
// 					opacity: icon === 'light' ? '100%' : '0%',
// 					position: 'absolute',
// 				}}
// 			/>
// 			<DarkModeIcon
// 				style={{ opacity: icon === 'dark' ? '100%' : '0%' }}
// 			/>
// 		</>
// 	);
// }

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
