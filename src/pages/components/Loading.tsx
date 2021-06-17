import React, { useEffect } from 'react';
import styles from '../../styles/loader.module.scss';

export default function Loading() {
	useEffect(() => {
		let i = 0;
		const colours = [
			'#ff2400',
			'#e81d1d',
			'#e8b71d',
			'#e3e81d',
			'#1ddde8',
			'#1de840',
			'#2b1de8',
			'#dd00f3',
			'#dd00f3',
		];

		function updateColor() {
			const elems = document
				.getElementById('loadingAnim')
				.getElementsByTagName('div');

			if (i + 1 >= colours.length) i = 0;

			for (let elemI = 0; elemI < elems.length; elemI++) {
				elems[elemI].style.background = colours[i];
			}

			i++;
		}

		updateColor();

		setInterval(() => updateColor(), 1200);
	});

	return (
		<div className={styles.lds_facebook} id='loadingAnim'>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
