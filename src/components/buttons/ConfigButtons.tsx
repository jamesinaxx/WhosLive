import type { SetStateAction } from "react";
import ColorModeToggle from "./ColorModeToggle";
import LogoutButton from "./LogoutButton";

interface ConfigButtonsProps {
  setShow: (value: SetStateAction<boolean>) => void;
}

function ConfigButtons({ setShow }: ConfigButtonsProps) {
  return (
    <div className="fixed top-1 right-1 flex flex-col gap-1">
      <ColorModeToggle />
      <LogoutButton onClick={() => setShow(true)} />
    </div>
  );
}

export default ConfigButtons;
