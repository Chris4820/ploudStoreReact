import type { ReactNode } from "react";
import { useGetUserInformation } from "../../api/store/user";
import { UserContext } from "./UserContext";
import { useLocation, Navigate } from "react-router-dom";
import LoadingPage from "../../containers/LoadingPage";

interface StoreProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: StoreProviderProps) {
  const { data: user, isLoading } = useGetUserInformation();
  const location = useLocation();

  if (isLoading) {
    return <LoadingPage />;
  }

  // Se não houver usuário e não estivermos em /auth, redireciona para /auth/login
  if (!user && !location.pathname.startsWith("/auth")) {
    return <Navigate to="/auth/login" replace />;
  }

  // Se houver usuário e estivermos em /auth, redireciona para a home
  if (user && location.pathname.startsWith("/auth")) {
    return <Navigate to="/" replace />;
  }

  return (
    <UserContext.Provider value={user || null}>
      {children}
    </UserContext.Provider>
  );
}
