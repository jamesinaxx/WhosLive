import { FunctionComponent } from 'preact';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

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
    <FontAwesomeIcon icon={favorite ? solidStar : emptyStar} size="lg" />
  </Button>
);

export default FavoriteButton;
