import type { FunctionComponent } from 'react';
import { css, useTheme } from '@emotion/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { controlButton } from '../../styleMixins';
import { setStorageLocal } from '../../lib/chromeapi';

interface ColorToggleProps {
  shown: boolean;
}

const ColorToggle: FunctionComponent<ColorToggleProps> = ({ shown }) => {
  const { type } = useTheme();

  return (
    <button
      css={css(controlButton(5))}
      type="button"
      onClick={() =>
        setStorageLocal('NowLive:Theme', type === 'light' ? 'dark' : 'light')
      }
      style={{ opacity: shown ? '0%' : '100%' }}
    >
      {type === 'light' ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ColorToggle;
