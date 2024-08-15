import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetServer } from "../../../../../api/store/store/server";
import HeaderSection from "../../../../../components/commons/Header";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { Copy, Eye, EyeOff, RefreshCcw } from "lucide-react";
import LoadingComponent from "../../../../../containers/LoadingComponent";
import CreateButtonComponent from "../../../../../components/commons/buttons/CreateButtonComponent";
import DeleteModal from "../../../../../components/modal/deleteModal";
import ConfirmModal from "../../../../../components/modal/confirmModal";
import { deleteServer, ServerProps, ServersProps } from "../../../../../api/req/store/server";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";




export default function CreateServerPage() {

  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleDelete() {
    deleteServerHandler(serverId);
  }
  const { mutate: deleteServerHandler } = useMutation({
    mutationFn: deleteServer,
    onSuccess: () => {
      // Remove o servidor específico do cache da lista completa
      queryClient.setQueryData(['server'], (oldData: ServerProps[] | undefined) => 
        oldData ? oldData.filter((server: ServersProps) => server.id !== serverId) : []
      );
  
      // Remove o cache do servidor específico pelo ID
      queryClient.removeQueries({ queryKey: ['server', serverId] });
  
      toast('Servidor eliminado com sucesso!');
      navigate(-1);
    }
  });

  if(isLoading) {
    return <LoadingComponent/>
  }

  return(
    <>
    <div className="flex justify-between items-center">
    <HeaderSection title="Editar servidor" description="Edite aqui as informações de seu servidor"/>
    <CreateButtonComponent title="Servidor"/>
    </div>

    <form className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      <div className="col-span-3 space-y-5">
        <div className="border rounded-lg p-5">
          <h4>Nome</h4>
          <Input className="mt-2" placeholder="Insira o nome do servidor" defaultValue={server?.name}/>

        </div>

        <div className="border rounded-lg p-5">
      <h4>Token</h4>
      <div className="relative mt-2">
      <Input
          type="text"
          placeholder="Insira o nome do servidor"
          defaultValue={server?.token}
          className="pr-16 text-transparent" // O texto do input será invisível
        />
        <span
          className={`absolute inset-y-0 left-2 flex items-center ${
            showToken ? "blur-0" : "blur-sm"
          }`}
        >
          {server?.token}
        </span>
        <div className="absolute inset-y-0 right-0 flex items-center space-x-2">
          <Button type="button" size={"icon"} onClick={handleToggleTokenVisibility}>
            {showToken ? <EyeOff/> : <Eye/>}
          </Button>
          <Button type="button" size={"icon"} onClick={handleCopyToken}><Copy/></Button>
          <ConfirmModal
                      title="Atualizar token"
                      description="Tem a certeza que pretende atualizar o token? O token antigo será eliminado!"
                      onConfirm={handleDelete}
                    >
              <Button type="button" size={"icon"}>
                <RefreshCcw/>
              </Button>
          </ConfirmModal>
            
        </div>
      </div>
    </div>

      </div>

    <div className="col-span-2">
        <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold text-destructive text-lg">Eliminar servidor</h1>
                        <p className="text-muted-foreground">Elimine permanentemente o servidor</p>
                        <p className="text-destructive text-sm mt-1">*Esta ação não tem volta</p>
                    </div>
                    <DeleteModal
                      title="Eliminar servidor"
                      description={`Tem a certeza que pretende eliminar o servidor ${server?.name}?`}
                      onConfirm={handleDelete}
                      important="Esta acção não tem volta"
                    >
                      <Button type="button" variant={"destructive"}>Eliminar</Button>
                    </DeleteModal>
                </div>
    </div>

    </form>
    <h1>{server?.name}</h1>
    </>
  )

}