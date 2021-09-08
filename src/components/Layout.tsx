import { FunctionComponent, ComponentChildren } from 'preact';
import ColorModeToggle from './buttons/ColorModeToggle';

interface LayoutProps {
  children: ComponentChildren;
  shown: boolean;
}

const Layout: FunctionComponent<LayoutProps> = ({ children, shown }) => (
  <div>
    {children}
    <ColorModeToggle shown={shown} />
  </div>
);

export default Layout;
