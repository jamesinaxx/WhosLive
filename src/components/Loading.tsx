import React from 'react';
import styles from '@styles/Loader.module.scss';

interface LoadingProps {
	color: string;
	hidden: boolean;
}

export default function Loading({ color, hidden }: LoadingProps) {
	const docBody = document.querySelector('body') as HTMLBodyElement;

	color = docBody.style.color;

	const circles: string[] = new Array(8).fill('');

	return (
		<div>
			<style>{`.lds_rollerDivs div:after {
				background: ${color};
			}`}</style>
			{hidden ? (
				<div>{null}</div>
			) : (
				<div
					className={styles.lds_roller + ' lds_rollerDivs'}
					id='loadingChannels'>
					{circles.map((_val, i) => (
						<div key={i} />
					))}
				</div>
			)}
		</div>
	);
}
