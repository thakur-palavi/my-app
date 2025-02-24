"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 1️⃣ Create Auth Context
const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const register = (email: string, password: string) => {
    localStorage.setItem("user", email);
    localStorage.setItem("password", password);
    setUser(email);
    return true;
  };

  const login = (email: string, password: string) => {
    const storedEmail = localStorage.getItem("user");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail === email && storedPassword === password) {
      setUser(email);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("password");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
