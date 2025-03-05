import type { ReactNode } from "react";
import { UserContext } from "./UserContext";
import { useLocation, Navigate } from "react-router-dom";
import LoadingPage from "../../containers/LoadingPage";
import { useGetUserInformation } from "../../globaldata/httpglobal";
import { initializeI18n } from "../../lib/reacti18next/i18n";

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const { data: user, isLoading } = useGetUserInformation();
  const location = useLocation();

  if (isLoading) {
    return <LoadingPage />;
  }

  // Se não houver usuário e não estivermos em /auth, redireciona para /auth/login
  if (!user && !location.pathname.startsWith("/auth")) {
    console.log("1");
    return <Navigate to="/auth/login" replace />;
  }

  if(user) {
    initializeI18n(user.language);
    // Se houver usuário e estivermos em /auth, redireciona para a home
    if (location.pathname.startsWith("/auth")) {
      console.log("2");
      return <Navigate to="/" replace />;
    }
  }
  
  console.log("3");
  return (
    <UserContext.Provider value={user || null}>
      {children}
    </UserContext.Provider>
  );
}
