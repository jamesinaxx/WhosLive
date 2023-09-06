import type {
  FunctionComponent,
  PropsWithChildren,
  SetStateAction,
} from 'react';
import ColorModeToggle from './ColorModeToggle';
import LogoutButton from './LogoutButton';

interface ConfigButtonsProps {
  setShow: (value: SetStateAction<boolean>) => void;
  show: boolean;
}

const ConfigButtons: FunctionComponent<
  PropsWithChildren<ConfigButtonsProps>
> = ({ setShow, show }) => (
  <>
    <ColorModeToggle shown={show} />
    <LogoutButton onClick={() => setShow(true)} shown={show} />
  </>
);

export default ConfigButtons;
