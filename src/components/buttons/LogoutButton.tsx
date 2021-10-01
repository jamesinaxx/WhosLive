import type { FunctionComponent } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
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
    <FaSignOutAlt />
  </Button>
);

export default LogoutButton;
