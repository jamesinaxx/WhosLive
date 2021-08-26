import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import styles from '../styles/Layout.module.scss';

interface InvalidateTokenProps {
  show: any;
  invalidateToken: () => void;
}

export default function InvalidateToken({
  show,
  invalidateToken,
}: InvalidateTokenProps) {
  document.body.style.overflow = 'hidden';

  return (
    <div className={styles.ruSure}>
      <h1>
        Are you sure you want to sign out?
        <br />
        To continue using Now Live you will have to log in again{' '}
      </h1>
      <ButtonGroup variant="contained">
        <Button onClick={invalidateToken}>Yes</Button>
        <Button color="primary" onClick={show}>
          No
        </Button>
      </ButtonGroup>
    </div>
  );
}
