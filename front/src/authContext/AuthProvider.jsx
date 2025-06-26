import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (token, user) => {
    localStorage.setItem("Sahel_Digital_Solutions_token", token);
    localStorage.setItem("Sahel_Digital_Solutions_user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("Sahel_Digital_Solutions_token");
    localStorage.removeItem("Sahel_Digital_Solutions_user");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("Sahel_Digital_Solutions_token");
    const storedUser = localStorage.getItem("Sahel_Digital_Solutions_user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
