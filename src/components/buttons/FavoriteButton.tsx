import type { FunctionComponent, PropsWithChildren } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface FavoriteButtonProps {
  favorite: boolean;
  toggleFavorite: (old: boolean) => void;
}

const Button = styled(motion.button)`
  transition: color 100ms ease-in-out;
  position: absolute;
  top: 10px;
  left: 15px;
  border: none;
  background: none;
  color: #ffd700;
  &:hover {
    color: #daba09;
  }
`;

const FavoriteButton: FunctionComponent<
  PropsWithChildren<FavoriteButtonProps>
> = ({ favorite, toggleFavorite }) => (
  <Button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    animate={favorite ? { rotate: 360 } : { rotate: 0 }}
    transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
    onClick={() => toggleFavorite(favorite)}
    type="button"
  >
    {favorite ? <FaStar size={20} /> : <FaRegStar size={20} />}
  </Button>
);

export default FavoriteButton;
