import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Ajuste o valor conforme necessário
    };

    handleResize(); // Verifica o tamanho da tela ao montar
    window.addEventListener('resize', handleResize); // Adiciona o listener

    return () => {
      window.removeEventListener('resize', handleResize); // Limpa o listener ao desmontar
    };
  }, []);

  return isMobile;
}