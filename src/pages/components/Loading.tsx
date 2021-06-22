import React from 'react';
import styles from '../../styles/loader.module.scss';

interface LoadingProps {
	color: string;
	hidden?: boolean;
}

export default function Loading({ color, hidden }: LoadingProps) {
	if (hidden === undefined) hidden = false;

	console.log('Color', color);

	color = document.querySelector('body').style.color;

	return (
		<>
			<style>{`.lds_rollerDivs div:after {
				background: ${color};
			}`}</style>
			{hidden ? (
				<div>{null}</div>
			) : (
				<div
					className={styles.lds_roller + ' lds_rollerDivs'}
					id='loadingChannels'
				>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			)}
		</>
	);
}
