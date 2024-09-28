


import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../lib/reactquery/reactquery";
import type { ServerFormData } from "../Schema/ServerSchema";
import { updateServer, type ServerProps } from "../api/req/server";
import { toast } from "sonner";

export const useUpdateServer = (serverId: number) => {

  return useMutation({
    mutationFn: (data: ServerFormData) => updateServer(serverId, data),
    onSuccess: (_, variables) => {
      // Atualiza o cache com o novo token
      queryClient.setQueryData(['server', serverId], (oldData: ServerProps | undefined) => {
        if (!oldData) return oldData;
        
        // Atualiza o token do servidor específico
        return {
            ...oldData,
            name: variables.name // Atualiza o token com o novo valor
        };
    });
     // Atualiza o cache da lista de servidores
     queryClient.setQueryData(['server'], (oldServers: ServerProps[] | undefined) => {
      if (!oldServers) return oldServers;

      return oldServers.map(server => 
        server.id === serverId ? { ...server, name: variables.name } : server
      );
    });

    toast.success("Servidor atualizado com sucesso!");
  }
  }
  )
}