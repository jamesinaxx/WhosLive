import React from 'react';
import styles from '@styles/layout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as starFilled } from '@fortawesome/free-solid-svg-icons';
import { faStar as star } from '@fortawesome/free-regular-svg-icons';

interface FavouriteButtonProps {
	favourite: boolean;
	setFavourite: () => void;
}

export default function FavouriteButton({
	favourite,
	setFavourite,
}: FavouriteButtonProps) {
	return (
		<button className={styles.faveButton} onClick={() => setFavourite()}>
			<FontAwesomeIcon
				className={styles.faveIcon}
				id='faveIcon'
				onClick={() => {
					const el = document.getElementById(
						'faveIcon'
					) as HTMLElement;
					el.style.transform = 'scale(125%)';
					setTimeout(() => (el.style.transform = 'scale(100%)'), 100);
				}}
				icon={favourite ? starFilled : star}
			/>
		</button>
	);
}
