import type { FunctionComponent, PropsWithChildren } from "react";
import { FaSignOutAlt } from "react-icons/fa";

interface LogoutButtonProps {
  onClick: () => void;
  shown: boolean;
}

const LogoutButton: FunctionComponent<PropsWithChildren<LogoutButtonProps>> = ({
  onClick,
  shown,
}) => (
  <button
    className="btn btn-primary"
    onClick={onClick}
    style={{
      opacity: shown ? "0%" : "100%",
      color: "#fff",
    }}
  >
    <FaSignOutAlt />
  </button>
);

export default LogoutButton;
