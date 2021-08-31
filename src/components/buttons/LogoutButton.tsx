import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Layout.module.scss';

interface LogoutButtonProps {
  ruSure: () => void;
  shown: boolean;
}

export default function LogoutButton({ ruSure, shown }: LogoutButtonProps) {
  return (
    <button
      type="button"
      className={styles.settingsButton}
      onClick={ruSure}
      style={{
        opacity: shown ? '0%' : '100%',
        color: '#fff',
      }}
    >
      <FontAwesomeIcon icon={faSignOutAlt} />
    </button>
  );
}
