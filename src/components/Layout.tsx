import type {
  FunctionComponent,
  PropsWithChildren,
  SetStateAction,
} from 'react';
import ConfigButtons from './buttons/ConfigButtons';

interface LayoutProps {
  setShow: (value: SetStateAction<boolean>) => void;
  show: boolean;
}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = ({
  children,
  setShow,
  show,
}) => (
  <div>
    {children}
    <ConfigButtons setShow={setShow} show={show} />
  </div>
);

export default Layout;
