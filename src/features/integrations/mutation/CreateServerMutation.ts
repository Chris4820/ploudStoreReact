


import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../lib/reactquery/reactquery";
import { toast } from "sonner";
import { createServer, type ServerProps, type ServersProps } from "../../server/api/req/server";

export const useCreateServer = (serverType: string) => {

  return useMutation({
    mutationFn: (name: string) => createServer(name, serverType),
      onSuccess: (data: { server: ServersProps }) => {
        const newServer = data.server;

        const existingServers = queryClient.getQueryData<ServerProps[]>(['server', serverType]) || [];

        const updatedServers = [...existingServers, newServer];
        queryClient.setQueryData(['server', serverType], updatedServers);
        toast.success('Servidor criado com sucesso');
  }
})
}