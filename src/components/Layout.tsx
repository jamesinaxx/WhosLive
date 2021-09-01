import { ComponentChildren } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faTwitch,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import ColorModeToggle from './buttons/ColorModeToggle';
import styles from '../styles/Layout.module.scss';
import Link from './Link';

interface LayoutProps {
  children: ComponentChildren;
  toggleColor: () => void;
  shown: boolean;
  mode: 'light' | 'dark';
}

export default function Layout({
  children,
  toggleColor,
  shown,
  mode,
}: LayoutProps) {
  return (
    <div>
      {children}
      <ColorModeToggle toggleColor={toggleColor} shown={shown} mode={mode} />
      <footer
        className={styles.footer}
        style={{ backgroundColor: document.body.style.backgroundColor }}
      >
        <Link href="https://github.com/jamesinaxx">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </Link>
        <Link href="https://twitch.tv/jamesinaxx">
          <FontAwesomeIcon icon={faTwitch} size="2x" />
        </Link>
        <Link href="https://twitter.com/jamesinaxx">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </Link>
      </footer>
    </div>
  );
}
