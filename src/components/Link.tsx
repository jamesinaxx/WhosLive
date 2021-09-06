import { FunctionComponent } from 'react';
import styled from 'styled-components';

const Anchor = styled.a`
  transition: color 100ms ease-in-out;
  margin: 5px;
  text-decoration: none;
  color: ${props => props.color};
  &:hover {
    color: ${props => props.theme.hoverColor};
  }
`;

const Link: FunctionComponent<{ href: string; mode: 'light' | 'dark' }> = ({
  href,
  mode,
  children,
}) => {
  const color = mode === 'light' ? '#000' : '#fff';
  const hoverColor = mode === 'light' ? '#504e4e' : '#cacaca';

  return (
    <Anchor
      href={href}
      target="_blank"
      rel="noreferrer"
      color={color}
      theme={{ hoverColor }}
    >
      {children}
    </Anchor>
  );
};

export default Link;
