/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import axiosAuth from "../lib/axios/axiosAuth";

type AuthContextType = {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
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
  const [isLoading, setLoading] = useState(true); // Inicialmente, setamos isLoading como true
  const [authChecked, setAuthChecked] = useState(false); // Estado para controlar se a autenticação foi verificada
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(); // Executa a verificação de autenticação ao montar o componente
  }, []);

  async function checkAuth() {
    setLoading(true);
    try {
      const response = await axiosAuth.post("checkauth");
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        handleLogout();
      }
    } catch (error) {
      handleLogout();
    } finally {
      setLoading(false);
      setAuthChecked(true); // Marca que a verificação de autenticação foi concluída
    }
  }

  async function handleLogout() {
    await axiosAuth.get("logout");
    setIsAuthenticated(false);
    navigate("/auth/login", { replace: true });
  }

  if (isLoading || !authChecked || !isAuthenticated) {
    return (
      <section className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center text-center">
          <CgSpinner size={50} className="animate-spin mb-2" />
          <span>Carregando a dashboard...</span>
        </div>
      </section>
    );
  }

  // Renderiza o contexto e seus filhos somente após a verificação de autenticação
  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, checkAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};