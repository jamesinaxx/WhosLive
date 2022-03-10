import type { FunctionComponent } from 'react';
import ColorModeToggle from './buttons/ColorModeToggle';

interface LayoutProps {
  shown: boolean;
}

const Layout: FunctionComponent<LayoutProps> = ({ children, shown }) => (
  <div>
    {children}
    <ColorModeToggle shown={shown} />
  </div>
);

export default Layout;
