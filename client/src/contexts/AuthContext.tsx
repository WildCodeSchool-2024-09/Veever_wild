import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { AuthContextType, UserType } from "../types/Auth/authType";

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider(children: ReactNode) {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/verifyToken`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };

    checkToken();
  }, []);

  const login = (user: UserType) => setUser(user);
  const logout = () => setUser(null);
  const isAdmin = () => user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
