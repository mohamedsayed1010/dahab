import { createContext, useState, useEffect } from "react";
import { refreshAccessToken } from "../api/auth/refreshToken";
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken");
  });

  const [refreshToken, setRefreshToken] = useState(() => {
    return localStorage.getItem("refreshToken");
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // LOGIN
  const login = ({ accessToken, refreshToken, user }) => {
    const safeUser = {
      _id: user?._id,
      name: user?.name,
      phone: user?.phone,
      role: user?.role,
    };

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(safeUser);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(safeUser));
    localStorage.setItem("tokenCreatedAt", Date.now());
  };

  // LOGOUT
  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenCreatedAt");
  };

  useEffect(() => {
    const checkTokenAge = async () => {
      const createdAt = localStorage.getItem("tokenCreatedAt");

      if (!createdAt || !refreshToken) return;

      const elevenMonths = 1000 * 60 * 60 * 24 * 30 * 11;

      const tokenAge = Date.now() - Number(createdAt);

      if (tokenAge >= elevenMonths) {
        try {
          const data = await refreshAccessToken();

          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);

          localStorage.setItem("accessToken", data.accessToken);

          localStorage.setItem("refreshToken", data.refreshToken);

          localStorage.setItem("tokenCreatedAt", Date.now());

          console.log("✅ Token refreshed before expiry");
        } catch (error) {
          console.log("❌ Token refresh failed");
          logout();
        }
      }
    };

    checkTokenAge();
  }, [refreshToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
