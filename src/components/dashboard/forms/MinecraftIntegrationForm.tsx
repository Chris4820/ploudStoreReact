import { DownloadCloud } from "lucide-react";
import { Button } from "../../ui/button";
import StepCardComponent from "../stepCard";
import HeaderSection from "../../commons/Header";
import { DataTable } from "../../ui/datatable";
import { useGetServers } from "../../../api/store/store/server";
import { columnsServer } from "./ServerColumns";
import CreateButtonComponent from "../../commons/buttons/CreateButtonComponent";
import CreateModal from "../../modal/createModal";
import { toast } from "sonner";
import { createServer, ServersProps } from "../../../api/req/store/server";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export default function MinecraftIntegrationForm() {

    function createHandler(name: string) {
        if(!name) {
            return toast("O nome não pode ser vazio");
        }
        createServerHandler(name);
      };

      const queryClient = useQueryClient();

      const { mutate: createServerHandler } = useMutation({
        mutationFn: createServer,
        onSuccess: (data: { server: ServersProps }) => {
            const newServer = data.server;

            // Adiciona o novo servidor ao cache da lista completa
            queryClient.setQueryData(['server'], (oldData: ServersProps[] | undefined) => {
                if (oldData) {
                    // Verifica se o servidor já existe para evitar duplicatas
                    const serverExists = oldData.some(server => server.id === newServer.id);
                    if (!serverExists) {
                        const updatedData = [...oldData, newServer];
                        console.log("UPDATE: " + JSON.stringify(updatedData));
                        return updatedData;
                    } else {
                        // Se o servidor já existe, apenas retorna oldData
                        console.warn("Servidor já existe no cache:", newServer);
                        return oldData;
                    }
                } else {
                    return [newServer];
                }
            });
    
            toast('Servidor criado com sucesso!');
        },
        onError: (error) => {
            console.error("Erro ao criar servidor:", error);
        }
    });

    const { data: tokens, isLoading} = useGetServers();
    return(
        <>
        <div className="flex justify-between items-center">
            <HeaderSection title="Minecraft" description="Integre o minecraft com sua loja"/>
            <CreateModal
                title="Criar servidor"
                description="Insira o nome do seu servidor"
                onConfirm={createHandler}
                >
            <CreateButtonComponent title="Servidor"/>
        </CreateModal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            <div className="w-full rounded-lg p-5 flex justify-between gap-5 items-center flex-wrap border">
            <div className="max-w-[400px]">
                <h1 className="font-semibold text-lg">Baixe o plugin</h1>
                <p className="text-muted-foreground">Baixe nosso plugin para integrar seu servidor à loja</p>
                <small className="text-[12px]">Suporte para: Bukkit, Spigot, Velocity, BungeeCord, Sponge</small>
            </div>
            <Button className="gap-2"><DownloadCloud size={18}/> Baixar</Button>
        </div>

        <DataTable data={tokens || []} loading={isLoading} columns={columnsServer} link="edit/{id}"/>
        </div>
        
        <section className="mt-10 flex flex-col gap-5">
            <h1 className="font-semibold text-lg">Como baixar?</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <StepCardComponent 
                title="Download do plugin"
                desc="Baixe o plugin PloudStore.jar e o coloque na pasta 'plugins' de seu servidor"
                number="1"/>
                <StepCardComponent
                title="Iniciando plugin"
                desc="Inicie ou reinicie o seu servidor. Uma pasta 'PloudStore' será automaticamente gerada na pasta 'plugins'"
                number="2"/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <StepCardComponent 
                title="Vinculando plugin"
                desc="No console do seu servidor, utilize o comando 'ploudstore token <seu-token>'. Substitua '<seu-token>' pelo token que deseja vincular."
                number="3"/>
                <StepCardComponent
                title="Finalizando"
                desc="Após seguir os passos anteriores, uma mensagem de confirmação será exibida, indicando o sucesso da operação."
                number="4"/>
            </div>
        </section>
        </>
    )
}