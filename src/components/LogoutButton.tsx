import { logout } from "../api/authenticationService";

export default function LogoutButton() {
  const logoutOnClick = async () => {
    try {
      const response = await logout();
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={logoutOnClick} className="rounded-t-xs shadow-outer px-4 py-1 text-white font-semibold text-center bg-linear-to-b from-red-600/40 to-red-700/70 hover:from-red-600/70 hover:to-red-800/90 border border-red-950 cursor-pointer transition-all duration-200">
      Logout
    </button>
  );
}
