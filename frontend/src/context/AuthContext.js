import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("userToken") || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ When user logs in successfully
  const loginUser = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    localStorage.setItem("userToken", tokenValue);
    localStorage.setItem("userData", JSON.stringify(userData)); // ✅ persist user info
  };

  // ✅ When user logs out
  const logoutUser = (fromEffect = false) => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    if (!fromEffect) navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loginUser,
        logoutUser,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
