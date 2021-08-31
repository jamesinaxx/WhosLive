import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';
import styles from '../../styles/Layout.module.scss';

interface ColorToggleProps {
  toggleColor: () => void;
  shown: boolean;
  mode: string;
}

export default function ColorToggle({
  toggleColor,
  shown,
  mode,
}: ColorToggleProps) {
  return (
    <button
      type="button"
      className={styles.colorModeToggle}
      onClick={toggleColor}
      style={{ opacity: shown ? '0%' : '100%' }}
    >
      <FontAwesomeIcon icon={mode === 'light' ? faSun : faMoon} />
    </button>
  );
}
