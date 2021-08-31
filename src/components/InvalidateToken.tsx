import styles from '../styles/Layout.module.scss';

interface InvalidateTokenProps {
  onChoice: (invalidate: boolean) => void;
}

export default function InvalidateToken({ onChoice }: InvalidateTokenProps) {
  document.body.style.overflow = 'hidden';

  return (
    <div className={styles.ruSure}>
      <h1>
        Are you sure you want to sign out?
        <br />
        To continue using Now Live you will have to log in again
      </h1>
      {/* <br style={{ width: '100vw' }} /> */}
      <button
        type="button"
        onClick={() => onChoice(true)}
        className={styles.confirmButton}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => onChoice(false)}
        className={styles.dismissButton}
      >
        No
      </button>
    </div>
  );
}
