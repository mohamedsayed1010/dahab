import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// Signed-in users have no reason to see the login form again.
export default function PublicOnlyRoute({ children }) {
  const { accessToken, user } = useContext(AuthContext);

  if (accessToken) {
    return <Navigate to={user?.role === "admin" ? "/dashboard" : "/"} replace />;
  }

  return children;
}
