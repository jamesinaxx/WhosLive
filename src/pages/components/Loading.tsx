import React from 'react';
import styles from '../../styles/loader.module.scss';

export default function Loading({ hidden }: { hidden?: boolean }) {
	if (hidden === undefined) hidden = false;

	return (
		<>
			{hidden ? (
				<div>{null}</div>
			) : (
				<div className={styles.lds_roller} id='loadingChannels'>
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
