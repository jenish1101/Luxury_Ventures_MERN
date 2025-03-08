// src/AuthContext.js
import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('AdminAccessToken'));

  const login = (token) => {
    sessionStorage.setItem("AdminAccessToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("AdminAccessToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



// useContext 
export const useAuth = () => useContext(AuthContext);