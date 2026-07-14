"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    // Lấy user từ localStorage khi mới load app
    const savedUser = localStorage.getItem("petshop_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Lỗi parse user", error);
      }
    }
    setIsAuthLoaded(true);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("petshop_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("petshop_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthLoaded }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
