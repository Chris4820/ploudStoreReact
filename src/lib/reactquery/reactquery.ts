import { QueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { t } from "../reacti18next/i18n";

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
          const errorCode = axiosError.response?.data?.message || 'Erro ao executar a operação.';
          toast.error(t("errors." + errorCode));
        } else {
          toast.error(error.message || 'Erro desconhecido');
        }
      },
    },
  },
});



export default queryClient;
