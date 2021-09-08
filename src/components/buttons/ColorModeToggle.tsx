import { FunctionComponent } from 'preact';
import { useContext } from 'preact/hooks';
import styled, { ThemeContext } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';
import { controlButton } from '../../styleMixins';
import { setStorageLocal } from '../../lib/chromeapi';

interface ColorToggleProps {
  shown: boolean;
}

const ColorToggleButton = styled.button`
  ${controlButton(5)}
`;

const ColorToggle: FunctionComponent<ColorToggleProps> = ({ shown }) => {
  const mode = useContext(ThemeContext).type;

  return (
    <ColorToggleButton
      type="button"
      onClick={() =>
        setStorageLocal('NowLive:Theme', mode === 'light' ? 'dark' : 'light')
      }
      style={{ opacity: shown ? '0%' : '100%' }}
    >
      <FontAwesomeIcon icon={mode === 'light' ? faSun : faMoon} />
    </ColorToggleButton>
  );
};

export default ColorToggle;
