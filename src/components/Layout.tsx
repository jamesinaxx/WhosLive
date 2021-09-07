import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faTwitch,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import ColorModeToggle from './buttons/ColorModeToggle';
import Link from './Link';
import { Footer } from '../styles/Mixins';

interface LayoutProps {
  children: ReactNode;
  shown: boolean;
  mode: 'light' | 'dark';
}

export default ({ children, shown, mode }: LayoutProps) => {
  const color = mode === 'dark' ? 'white' : 'black';

  return (
    <div>
      {children}
      <ColorModeToggle shown={shown} mode={mode} />
      <Footer
        style={{
          backgroundColor: document.body.style.backgroundColor,
          color,
        }}
      >
        <Link href="https://github.com/jamesinaxx" mode={mode}>
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </Link>
        <Link href="https://twitch.tv/jamesinaxx" mode={mode}>
          <FontAwesomeIcon icon={faTwitch} size="2x" />
        </Link>
        <Link href="https://twitter.com/jamesinaxx" mode={mode}>
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </Link>
      </Footer>
    </div>
  );
};
