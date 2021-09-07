import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { controlButton } from '../../styles/Mixins';

interface LogoutButtonProps {
  onClick: () => void;
  shown: boolean;
}

const LogoutButton = styled.button`
  ${controlButton(40)}
`;

export default ({ onClick, shown }: LogoutButtonProps) => (
  <LogoutButton
    type="button"
    onClick={onClick}
    style={{
      opacity: shown ? '0%' : '100%',
      color: '#fff',
    }}
  >
    <FontAwesomeIcon icon={faSignOutAlt} />
  </LogoutButton>
);
