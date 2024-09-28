import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetServer } from "../api/store/server";
import { useUpdateServer } from "../mutations/UpdateServerMutation";
import { useReloadTokenServer } from "../mutations/ReloadTokenMutation";
import { useDeleteServer } from "../mutations/DeleteServerMutation";
import { toast } from "sonner";
import LoadingComponent from "../../../containers/LoadingComponent";
import HeaderSection from "../../../components/commons/Header";
import ServerForm from "../components/ServerForm";
import ConfirmModal from "../../../components/modal/confirmModal";
import { Button } from "../../../components/ui/button";
import DeleteModal from "../../../components/modal/deleteModal";



export default function ServerPage() {

  const params = useParams();
  const navigate = useNavigate();
  const serverId = parseInt(params.id as string, 10);


  useEffect(() => {
    if (isNaN(serverId)) {
      navigate("/dashboard/settings/integration");
    }
  }, [navigate, serverId]);

  const { data: server, isLoading} = useGetServer(serverId);

  const {mutate: updateServer, isPending: updatePending} = useUpdateServer(serverId);

  const {mutate: reloadToken, isPending: reloadPending} = useReloadTokenServer(serverId);

  const {mutate: deleteServer, isPending: deletePending} = useDeleteServer(serverId, "server");

  function handleCopyToken() {
    if (server?.token) {
      navigator.clipboard.writeText(server.token).then(() => {
        toast.success("Token copiado para a área de transferência!");
      }).catch((err) => {
        console.error('Falha ao copiar o token: ', err);
      });
    }
  }
  
  if(isLoading) {
    return <LoadingComponent/>
  }

  return(
    <>
    <HeaderSection title="Editar servidor" description="Edite aqui as informações de seu servidor" backLink="../"/>

    <section className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      <section className="col-span-3">
        <ServerForm initialData={server} isPending={updatePending} onSubmit={(data) => updateServer(data)}/>
      </section>
      

      <div className="col-span-2">
      <div className="p-5 border rounded-lg flex justify-between gap-5">
        <div>
          <h1 className="font-semibold text-lg">Token</h1>
          <p className="text-muted-foreground"><span className="text-destructive font-semibold">Nunca</span> partilhe o token com ninguém!</p>
        </div>
          <div className="mt-5 flex justify-end gap-5">
          <ConfirmModal
            title="Atualizar token"
            key={"reload"}
            description="Tem a certeza que pretende atualizar o token? O token antigo será eliminado!"
            onConfirm={reloadToken}
          >
              <Button disabled={reloadPending} variant={"outline"} type="button">
                Renovar
              </Button>
          </ConfirmModal> 
              <Button type="button" onClick={handleCopyToken}>Copiar</Button>
          </div>
      </div>
        <div className="p-5 border rounded-lg flex justify-between items-center mt-5">
                    <div>
                        <h1 className="font-semibold text-destructive text-lg">Eliminar servidor</h1>
                        <p className="text-muted-foreground">Elimine permanentemente o servidor</p>
                        <p className="text-destructive text-sm mt-1">*Esta ação não tem volta</p>
                    </div>
                    <DeleteModal
                      title="Eliminar servidor"
                      key={"delete"}
                      description={`Tem a certeza que pretende eliminar o servidor ${server?.name}?`}
                      onConfirm={deleteServer}
                      important="Esta acção não tem volta"
                    >
                      <Button disabled={deletePending} type="button" variant={"destructive"}>Eliminar</Button>
                    </DeleteModal>
                </div>
    </div>

    </section>
    </>
  )

}