import { ReactNode } from 'react';
import { Anchor } from '../styles/Mixins';

interface LinkProps {
  href: string;
  mode: 'light' | 'dark';
  children: ReactNode;
}

const Link = ({ href, mode, children }: LinkProps) => (
  <Anchor
    href={href}
    target="_blank"
    rel="noreferrer"
    color={mode === 'light' ? '#000' : '#fff'}
    theme={{ hoverColor: mode === 'light' ? '#504e4e' : '#cacaca' }}
  >
    {children}
  </Anchor>
);

export default Link;
