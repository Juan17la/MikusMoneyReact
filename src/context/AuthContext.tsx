import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import type { ReactNode } from "react";
import axiosInstance from "../api/axiosInstance";

// Tipos para el usuario
interface User {
  id: number;
  name: string;
  lastName: string;
  birthDate: string;
  publicCode: string;
}

// Tipos para el contexto
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pin: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider del contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticación al montar el componente (solo una vez)
  const checkAuth = useCallback(async () => {
    try {
      // Intentar obtener información del usuario actual
      const response = await axiosInstance.get("/auth/me");
      
      if (response.data) {
        setUser({
          id: response.data.id,
          name: response.data.name,
          lastName: response.data.lastName,
          birthDate: response.data.birthDate,
          publicCode: response.data.publicCode,
        });
      }
    } catch {
      // Si falla, el usuario no está autenticado
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Verificar auth solo al montar el provider
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Función de login
  const login = useCallback(async (email: string, pin: string) => {
    const requestBody = {
      email,
      pinCode: pin,
    };

    const response = await axiosInstance.post("/auth/login", requestBody);
    
    // Después del login exitoso, guardar la info del usuario
    if (response.data) {
      setUser({
        id: response.data.id,
        name: response.data.name,
        lastName: response.data.lastName,
        birthDate: response.data.birthDate,
        publicCode: response.data.publicCode,
      });
    }
  }, []);

  // Función de logout
  const logout = useCallback(async () => {
    await axiosInstance.post("/auth/logout");
    setUser(null);
  }, []);

  // Función para refrescar la autenticación manualmente
  const refreshAuth = useCallback(async () => {
    setIsLoading(true);
    await checkAuth();
  }, [checkAuth]);

  // Calcular isAuthenticated basado en si hay usuario
  const isAuthenticated = user !== null;

  // Memoizar el valor del contexto para evitar re-renders innecesarios
  const contextValue = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      refreshAuth,
    }),
    [user, isAuthenticated, isLoading, login, logout, refreshAuth]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
