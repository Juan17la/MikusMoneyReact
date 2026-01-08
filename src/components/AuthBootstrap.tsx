import { useAuth } from "../context/AuthContext";
import GlobalLoader from "./GlobalLoader";
import type { JSX } from "react";

export default function AuthBootstrap({ children }: { children: JSX.Element }) {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <GlobalLoader />;
  }
  return <>{children}</>;
}
