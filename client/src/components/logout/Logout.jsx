import { Navigate } from "react-router-dom";
import { logoutHook } from "../../hooks/authHook";

export default function Logout() {
  const logout = logoutHook();
  logout();

  return <Navigate to="/" />;
}
