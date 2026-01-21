import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";
import { memo } from "react";

export const PrivateRoute = memo(({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  // Loading is handled at App level, so we only check authentication
  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
});

PrivateRoute.displayName = 'PrivateRoute';
