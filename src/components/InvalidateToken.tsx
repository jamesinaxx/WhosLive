import { ButtonGroup, Button } from '@material-ui/core';
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
        To continue using Now Live you will have to log in again{' '}
      </h1>
      <ButtonGroup variant="contained">
        <Button onClick={() => onChoice(true)}>Yes</Button>
        <Button color="primary" onClick={() => onChoice(false)}>
          No
        </Button>
      </ButtonGroup>
    </div>
  );
}
