import styles from '../styles/Layout.module.scss';

export default function NoAuth() {
  return (
    <small className={styles.noAuth}>
      You are not logged in to Twitch! Please go to{' '}
      <a
        href="https://nowlive.jamesinaxx.me/auth/"
        target="_blank"
        rel="noreferrer"
      >
        this page
      </a>
      , log in with Twitch, and then come back here.
    </small>
  );
}
