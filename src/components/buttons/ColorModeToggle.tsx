import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import { controlButton } from '../../styles/Mixins';
import { setStorageLocal } from '../../lib/chromeapi';

interface ColorToggleProps {
  shown: boolean;
  mode: 'light' | 'dark';
}

const ColorToggleButton = styled.button`
  ${controlButton(5)}
`;

export default function ColorToggle({ shown, mode }: ColorToggleProps) {
  return (
    <ColorToggleButton
      type="button"
      onClick={() =>
        setStorageLocal(
          'NowLive:Storage:Color',
          mode === 'light' ? 'dark' : 'light',
        )
      }
      style={{ opacity: shown ? '0%' : '100%' }}
    >
      <FontAwesomeIcon icon={mode === 'light' ? faSun : faMoon} />
    </ColorToggleButton>
  );
}
