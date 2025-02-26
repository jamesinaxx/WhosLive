import type { ReactNode, SetStateAction } from "react";
import ConfigButtons from "./buttons/ConfigButtons";

interface LayoutProps {
  setShow: (value: SetStateAction<boolean>) => void;
  children: ReactNode;
}

function Layout({ children, setShow }: LayoutProps) {
  return (
    <div>
      {children}
      <ConfigButtons setShow={setShow} />
    </div>
  );
}

export default Layout;
