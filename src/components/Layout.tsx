import React from 'react';
import ColorModeToggle from './buttons/ColorModeToggle';

interface LayoutProps {
	children: React.ReactNode;
	toggleColor: () => void;
	shown: boolean;
	mode: string;
}

export default function Layout({
	children,
	toggleColor,
	shown,
	mode,
}: LayoutProps) {
	return (
		<div>
			<ColorModeToggle
				toggleColor={toggleColor}
				shown={shown}
				mode={mode}
			/>
			{children}
		</div>
	);
}
