


import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../lib/reactquery/reactquery";
import { deleteServer, type ServerProps, type ServersProps } from "../api/req/server";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useDeleteServer = (serverId: number, serverType: string) => {

  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteServer(serverId),
      onSuccess: () => {
        // Remove o servidor específico do cache da lista completa
        queryClient.setQueryData(['server', serverType], (oldData: ServerProps[] | undefined) => 
          oldData ? oldData.filter((server: ServersProps) => server.id !== serverId) : []
        );
        // Remove o cache do servidor específico pelo ID
        queryClient.removeQueries({ queryKey: ['server', serverId] });
      toast.success('Servidor deletado com sucesso');
      navigate('../integration/server');
  }
})
}