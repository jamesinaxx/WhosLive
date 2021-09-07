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
}

export default ({ children, shown }: LayoutProps) => (
  <div>
    {children}
    <ColorModeToggle shown={shown} />
    <Footer>
      <Link href="https://github.com/jamesinaxx">
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </Link>
      <Link href="https://twitch.tv/jamesinaxx">
        <FontAwesomeIcon icon={faTwitch} size="2x" />
      </Link>
      <Link href="https://twitter.com/jamesinaxx">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </Link>
    </Footer>
  </div>
);
