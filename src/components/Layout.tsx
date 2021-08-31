import * as React from 'react';
import ColorModeToggle from './buttons/ColorModeToggle';

interface LayoutProps {
  children: React.ReactNode;
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
