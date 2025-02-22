// src/contexts/StoreProvider.tsx
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import LoadingPage from "../../containers/LoadingPage";
import { StoreContext } from "./StoreContext";
import { useGetStoreInformation } from "../../globaldata/httpglobal";

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const { data: store, isLoading } = useGetStoreInformation();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!store) {
    // Se não houver dados, redireciona ou exibe uma mensagem
    return <Navigate to="/" replace />;
  }

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}
