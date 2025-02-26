import { FaSignOutAlt } from "react-icons/fa";

function LogoutButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      <FaSignOutAlt />
    </button>
  );
}

export default LogoutButton;
