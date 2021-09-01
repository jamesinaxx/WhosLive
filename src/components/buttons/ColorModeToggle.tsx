import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import { controlButton } from '../../styles/Mixins';

interface ColorToggleProps {
  toggleColor: () => void;
  shown: boolean;
  mode: 'light' | 'dark';
}

const ColorToggleButton = styled.button`
  ${controlButton(5)}
`;

export default function ColorToggle({
  toggleColor,
  shown,
  mode,
}: ColorToggleProps) {
  return (
    <ColorToggleButton
      type="button"
      onClick={toggleColor}
      style={{ opacity: shown ? '0%' : '100%' }}
    >
      <FontAwesomeIcon icon={mode === 'light' ? faSun : faMoon} />
    </ColorToggleButton>
  );
}
