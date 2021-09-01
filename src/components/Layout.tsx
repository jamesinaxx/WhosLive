import { ComponentChildren } from 'preact';
import ColorModeToggle from './buttons/ColorModeToggle';

interface LayoutProps {
  children: ComponentChildren;
  toggleColor: () => void;
  shown: boolean;
  mode: 'light' | 'dark';
}

export default function Layout({
  children,
  toggleColor,
  shown,
  mode,
}: LayoutProps) {
  return (
    <div>
      {children}
      <ColorModeToggle toggleColor={toggleColor} shown={shown} mode={mode} />
    </div>
  );
}
