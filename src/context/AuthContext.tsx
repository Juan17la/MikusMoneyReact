import { createContext, useContext, useEffect, useState, useMemo, useCallback, useRef } from "react";
import type React from "react";
import axiosInstance from "../api/axiosInstance";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  error: string | null;
  logout: () => void;
  login: (userData: any) => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
  logout: () => {},
  login: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const hasCheckedAuth = useRef(false);

  const login = useCallback((userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
    setError(null);
  }, []);

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      setError(null);
    }
  }, []);

  useEffect(() => {
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;

    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");
        setIsAuthenticated(true);
        setUser(response.data);
        setError(null);
      } catch (err: any) {
        setIsAuthenticated(false);
        setUser(null);
        setError(err.message || "Authentication failed");
      } finally {
        // loading solo pasa a false aquí
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []); // array vacío solo al montar

  const value = useMemo(
    () => ({ isAuthenticated, isLoading, user, error, logout, login }),
    [isAuthenticated, isLoading, user, error, logout, login]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
