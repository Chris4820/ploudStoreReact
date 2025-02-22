import { QueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface CustomErrorResponse {
  message: string;
  // Outros campos de erro específicos podem ser adicionados aqui
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Número de tentativas em caso de falha
      refetchOnWindowFocus: false, // Evita refetch ao focar na janela
      staleTime: 1000 * 60 * 2, // Tempo que os dados ficam "frescos" 2 minutos
    },
    mutations: {
      onError: (error: Error) => {
        console.log("Erro aqui");
        if ((error as AxiosError<CustomErrorResponse>).isAxiosError) {
          const axiosError = error as AxiosError<CustomErrorResponse>;
          const errorMessage = axiosError.response?.data?.message || 'Erro ao executar a operação.';
          toast.error(errorMessage);
        } else {
          toast.error(error.message || 'Erro desconhecido');
        }
      },
    },
  },
});

export default queryClient;
