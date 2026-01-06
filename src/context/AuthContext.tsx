import { createContext, useContext, useState, useMemo, useCallback, useRef, useSyncExternalStore } from "react";
import type React from "react";
import axiosInstance from "../api/axiosInstance";

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  error: string | null;
};

type AuthContextType = AuthState & {
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

// Singleton auth state - persists across re-renders and strict mode
let authState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
};

let authPromise: Promise<void> | null = null;
const listeners = new Set<() => void>();

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => authState;

// Initialize auth check immediately (outside of React lifecycle)
const initializeAuth = (): Promise<void> => {
  if (authPromise) return authPromise;

  authPromise = axiosInstance
    .get("/auth/me")
    .then((response) => {
      authState = {
        isAuthenticated: true,
        isLoading: false,
        user: response.data,
        error: null,
      };
    })
    .catch((err: any) => {
      authState = {
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: err.response?.status === 401 ? null : (err.message || "Authentication failed"),
      };
    })
    .finally(() => {
      notifyListeners();
    });

  return authPromise;
};

// Start auth check immediately when module loads
initializeAuth();

export const AuthProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  // Use useSyncExternalStore for optimal re-renders
  const currentAuthState = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const login = useCallback((userData: any) => {
    authState = {
      isAuthenticated: true,
      isLoading: false,
      user: userData,
      error: null,
    };
    notifyListeners();
  }, []);

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      authState = {
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      };
      notifyListeners();
    }
  }, []);

  const value = useMemo(
    () => ({ ...currentAuthState, logout, login }),
    [currentAuthState, logout, login]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
