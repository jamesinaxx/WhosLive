import { ComponentChildren } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faTwitch,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import ColorModeToggle from './buttons/ColorModeToggle';
import Link from './Link';

interface LayoutProps {
  children: ComponentChildren;
  toggleColor: () => void;
  shown: boolean;
  mode: 'light' | 'dark';
}

const Footer = styled.footer`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 50px;
  bottom: 0;
  left: 0;
  z-index: 1;
  padding: 5px;
  margin: 0;
  border-top: 1px solid white;
  background-color: ${props => props.style?.backgroundColor || 'black'};
  color: ${props => props.style?.color || 'white'};
`;

export default function Layout({
  children,
  toggleColor,
  shown,
  mode,
}: LayoutProps) {
  const color = mode === 'dark' ? 'white' : 'black';

  return (
    <div>
      {children}
      <ColorModeToggle toggleColor={toggleColor} shown={shown} mode={mode} />
      <Footer
        style={{
          backgroundColor: document.body.style.backgroundColor,
          color,
        }}
      >
        <Link href="https://github.com/jamesinaxx" color={color}>
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </Link>
        <Link href="https://twitch.tv/jamesinaxx" color={color}>
          <FontAwesomeIcon icon={faTwitch} size="2x" />
        </Link>
        <Link href="https://twitter.com/jamesinaxx" color={color}>
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </Link>
      </Footer>
    </div>
  );
}
