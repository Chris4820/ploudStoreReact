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
      retry: 1,
      refetchOnWindowFocus: false, // Evita refetch ao focar na janela
      staleTime: 1000 * 60 * 2, // Tempo que os dados ficam "frescos" 2 minutos
    },
    mutations: {
      onError: (error: Error) => {
        console.log("Axios Error: " + error);
        console.log("Erro aqui");
        if ((error as AxiosError<CustomErrorResponse>).isAxiosError) {
          const axiosError = error as AxiosError<CustomErrorResponse>;
          const statusCode = axiosError.response?.status;
          if (statusCode === 401) {
            console.log("Sessão expirada ou sem autorização.");
            toast.error("Sessão expirada ou sem autorização.");
          }
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
