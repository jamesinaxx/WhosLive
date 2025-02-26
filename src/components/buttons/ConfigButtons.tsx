import type {
  FunctionComponent,
  PropsWithChildren,
  SetStateAction,
} from "react";
import ColorModeToggle from "./ColorModeToggle";
import LogoutButton from "./LogoutButton";

interface ConfigButtonsProps {
  setShow: (value: SetStateAction<boolean>) => void;
  show: boolean;
}

const ConfigButtons: FunctionComponent<
  PropsWithChildren<ConfigButtonsProps>
> = ({ setShow, show }) => (
  <div className="fixed top-5 right-5">
    <ColorModeToggle shown={show} />
    <LogoutButton onClick={() => setShow(true)} shown={show} />
  </div>
);

export default ConfigButtons;
