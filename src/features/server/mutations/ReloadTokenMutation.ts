


import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../lib/reactquery/reactquery";
import { updateTokenServer, type ServerProps } from "../api/req/server";
import { toast } from "sonner";

export const useReloadTokenServer = (serverId: number) => {


  return useMutation({
    mutationFn: () => updateTokenServer(serverId),
      onSuccess: (newToken) => {
        // Atualiza o cache com o novo token
        queryClient.setQueryData(['server', serverId], (oldData: ServerProps | undefined) => {
          if (!oldData) return oldData;
          
          // Atualiza o token do servidor específico
          return {
              ...oldData,
              token: newToken // Atualiza o token com o novo valor
          };
      });
  
      toast('Token atualziado com sucesso');
    }
  })
}