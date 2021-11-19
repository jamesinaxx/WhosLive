import type { FunctionComponent } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { css } from '@emotion/react';
import { controlButton } from '../../styleMixins';

interface LogoutButtonProps {
  onClick: () => void;
  shown: boolean;
}

const LogoutButton: FunctionComponent<LogoutButtonProps> = ({
  onClick,
  shown,
}) => (
  <button
    css={css(controlButton(40))}
    type="button"
    onClick={onClick}
    style={{
      opacity: shown ? '0%' : '100%',
      color: '#fff',
    }}
  >
    <FaSignOutAlt />
  </button>
);

export default LogoutButton;
