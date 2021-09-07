import { FunctionComponent, ComponentChildren } from 'preact';
import { useContext } from 'preact/hooks';
import { ThemeContext } from 'styled-components';
import { Anchor } from '../styleMixins';

interface LinkProps {
  href: string;
  children: ComponentChildren;
}

const Link: FunctionComponent<LinkProps> = ({ href, children }) => {
  const mode = useContext(ThemeContext).type;

  return (
    <Anchor
      href={href}
      target="_blank"
      rel="noreferrer"
      color={mode === 'light' ? '#000' : '#fff'}
      hoverColor={mode === 'light' ? '#504e4e' : '#cacaca'}
    >
      {children}
    </Anchor>
  );
};

export default Link;
