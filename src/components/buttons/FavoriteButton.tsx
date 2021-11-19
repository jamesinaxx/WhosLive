import type { FunctionComponent } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';

interface FavoriteButtonProps {
  favorite: boolean;
  toggleFavorite: (old: boolean) => void;
}

const FavoriteButton: FunctionComponent<FavoriteButtonProps> = ({
  favorite,
  toggleFavorite,
}) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    animate={favorite ? { rotate: 360 } : { rotate: 0 }}
    transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
    onClick={() => toggleFavorite(favorite)}
    css={css`
      transition: color 100ms ease-in-out;
      position: absolute;
      top: 10px;
      right: 20px;
      border: none;
      background: none;
      color: #ffd700;
      &:hover {
        color: #daba09;
      }
    `}
    type="button"
  >
    {favorite ? <FaStar size={20} /> : <FaRegStar size={20} />}
  </motion.button>
);

export default FavoriteButton;
