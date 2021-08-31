import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Layout.module.scss';

interface LogoutButtonProps {
  onClick: () => void;
  shown: boolean;
}

export default function LogoutButton({ onClick, shown }: LogoutButtonProps) {
  return (
    <button
      type="button"
      className={styles.settingsButton}
      onClick={onClick}
      style={{
        opacity: shown ? '0%' : '100%',
        color: '#fff',
      }}
    >
      <FontAwesomeIcon icon={faSignOutAlt} />
    </button>
  );
}
