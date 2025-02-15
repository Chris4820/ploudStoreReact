/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import queryClient from "../lib/reactquery/reactquery";
import axiosAuth from "../lib/axios/axiosAuth";
import { getUserInformation } from "../api/req/user";
import { getStoreInformation } from "../features/stores/api/req/store";

type AuthContextType = {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    authenticate(); // Executa a lógica de autenticação ao montar o componente
  }, []);

  async function authenticate() {
    setLoading(true);
    try {
      // Prefetch do usuário
      console.log("Executando prefetch do usuário...");
      const user = await queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: getUserInformation, // Adicione explicitamente o queryFn
      }).catch(() => {
        return handleLogout();
      });
      console.log("User: " + user);

      if (!user) {
        // Sem usuário, faz logout
        return handleLogout();
      }
      setIsAuthenticated(true);

      // Prefetch da store
      const store = await queryClient.fetchQuery({
        queryKey: ["store"],
        queryFn: getStoreInformation
      }).catch(() => {
        return navigate("/", { replace: true }); // Faz logout em caso de erro
      });

      if (!store) {
        // Sem store, redireciona para index de lojas
        return navigate("/", { replace: true });
        
      }
    } catch (error) {
      console.error("Erro na autenticação:", error);
      handleLogout(); // Faz logout em caso de erro
    } finally {
      setLoading(false); // Conclui o carregamento
    }
  }

  async function handleLogout() {
    await axiosAuth.get("logout");
    setIsAuthenticated(false);
    navigate("/auth/login", { replace: true });
  }

  if (isLoading) {
    return (
      <section className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center text-center">
          <CgSpinner size={50} className="animate-spin mb-2" />
          <span>Carregando a dashboard...</span>
        </div>
      </section>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
