import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";
import { memo } from "react";

export const PublicOnlyRoute = memo(({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  // Loading is handled at App level, so we only check authentication
  return isAuthenticated ? <Navigate to="/account" replace /> : children;
});

PublicOnlyRoute.displayName = 'PublicOnlyRoute';
