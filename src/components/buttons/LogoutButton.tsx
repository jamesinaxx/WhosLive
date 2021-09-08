import { FunctionComponent } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { controlButton } from '../../styleMixins';

interface LogoutButtonProps {
  onClick: () => void;
  shown: boolean;
}

const Button = styled.button`
  ${controlButton(40)}
`;

const LogoutButton: FunctionComponent<LogoutButtonProps> = ({
  onClick,
  shown,
}) => (
  <Button
    type="button"
    onClick={onClick}
    style={{
      opacity: shown ? '0%' : '100%',
      color: '#fff',
    }}
  >
    <FontAwesomeIcon icon={faSignOutAlt} />
  </Button>
);

export default LogoutButton;
