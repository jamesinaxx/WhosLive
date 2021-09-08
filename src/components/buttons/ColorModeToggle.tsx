import { FunctionComponent } from 'preact';
import { useContext } from 'preact/hooks';
import styled, { ThemeContext } from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';
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
      {mode === 'light' ? <FaSun /> : <FaMoon />}
    </ColorToggleButton>
  );
};

export default ColorToggle;
