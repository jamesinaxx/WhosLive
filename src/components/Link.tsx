import type { FunctionComponent } from 'react';
import { useTheme } from 'styled-components';
import { Anchor } from '../styleMixins';

interface LinkProps {
  href: string;
}

const Link: FunctionComponent<LinkProps> = ({ href, children }) => {
  const { type } = useTheme();

  return (
    <Anchor
      href={href}
      target="_blank"
      rel="noreferrer"
      color={type === 'light' ? '#000' : '#fff'}
      hoverColor={type === 'light' ? '#504e4e' : '#cacaca'}
    >
      {children}
    </Anchor>
  );
};

export default Link;
