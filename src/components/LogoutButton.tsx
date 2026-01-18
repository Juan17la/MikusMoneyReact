import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

type LogoutButtonProps = {
  className?: string;
}

export default function LogoutButton({ className }: LogoutButtonProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const logoutOnClick = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (error) {
      throw new Error("Logout failed");
    }
  };

  return (
    <button onClick={logoutOnClick} className={"shadow-outer px-4 py-1 text-white font-semibold text-center bg-linear-to-b from-red-600/40 to-red-700/70 hover:from-red-600/70 hover:to-red-800/90 border border-red-900 cursor-pointer transition-all duration-200" + (className ? ` ${className}` : "")}>
      Logout
    </button>
  );
}
