import type { FunctionComponent } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { css } from '@emotion/react';

interface FavoriteButtonProps {
  favorite: boolean;
  toggleFavorite: (old: boolean) => void;
}

const FavoriteButton: FunctionComponent<FavoriteButtonProps> = ({
  favorite,
  toggleFavorite,
}) => (
  <button
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
  </button>
);

export default FavoriteButton;
