import { FunctionComponent } from 'preact';
import styles from '../styles/Layout.module.scss';

const Link: FunctionComponent<{ href: string }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer" className={styles.link}>
    {children}
  </a>
);

export default Link;
