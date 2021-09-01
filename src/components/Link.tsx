import { FunctionComponent } from 'preact';
import styled from 'styled-components';
import { darken } from 'polished';

const Anchor = styled.a`
  margin: 5px;
  text-decoration: none;
  color: #ba00f2;
  &:hover {
    color: ${darken(0.2, '#ba00f2')};
  }
`;

const Link: FunctionComponent<{ href: string; color: string }> = ({
  href,
  color,
  children,
}) => (
  <Anchor href={href} target="_blank" rel="noreferrer" color={color}>
    {children}
  </Anchor>
);

export default Link;
