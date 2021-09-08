import { FunctionComponent } from 'preact';
import styled from 'styled-components';
import { FaStar, FaRegStar } from 'react-icons/fa';

const Button = styled.button`
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
`;

interface FavoriteButtonProps {
  favorite: boolean;
  toggleFavorite: (old: boolean) => void;
}

const FavoriteButton: FunctionComponent<FavoriteButtonProps> = ({
  favorite,
  toggleFavorite,
}) => (
  <Button onClick={() => toggleFavorite(favorite)}>
    {favorite ? <FaStar size={20} /> : <FaRegStar size={20} />}
  </Button>
);

export default FavoriteButton;
