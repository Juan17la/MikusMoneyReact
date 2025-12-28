import { createContext, useContext, useEffect, useState } from "react";
import type React from "react";
import axiosInstance from "../api/axiosInstance";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  error: string | null;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance
      .get("/auth/me")
      .then((response) => {
        setIsAuthenticated(true);
        setUser(response.data);
        setError(null);
      })
      .catch((err) => {
        setIsAuthenticated(false);
        setUser(null);
        setError(err.message || "Authentication failed");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
