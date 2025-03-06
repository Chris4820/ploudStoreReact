import { DownloadCloud } from "lucide-react";
import { Button } from "../../../components/ui/button";
import StepCardComponent from "../../../components/dashboard/stepCard";
import { DataTable } from "../../../components/ui/datatable";
import { useGetServers } from "../../server/api/store/server";
import { columnsServer } from "../columns/ServerColumns";
import CreateButtonComponent from "../../../components/commons/buttons/CreateButton";
import CreateModal from "../../../components/modal/createModal";
import { toast } from "sonner";
import HeaderSection from "../../../components/commons/Header";
import { useCreateServer } from "../mutation/CreateServerMutation";



export default function MinecraftIntegrationSection() {


    const { mutate: createServer} = useCreateServer("server");

    function createHandler(name: string) {
        if(!name) {
            return toast("O nome não pode ser vazio");
        }
        createServer(name);
      }


    const { data: tokens, isLoading} = useGetServers("server");
    return(
        <>
        <div className="flex justify-between items-center">
            <HeaderSection backLink="../integration" title="Minecraft" description="Integre seu servidor Minecraft com sua loja!"/>
            <CreateModal
                title="Criar servidor"
                description="Insira o nome do seu servidor"
                onConfirm={createHandler}
                >
            <CreateButtonComponent title="Servidor"/>
        </CreateModal>
        </div>

        <div className="grid grid-cols-1 gap-5 items-start mt-5">

        <DataTable data={tokens || []} loading={isLoading} columns={columnsServer} link="edit/{id}"/>

        <div className="w-full rounded-lg p-5 flex justify-between gap-5 items-center flex-wrap border">
            <div className="max-w-[400px]">
                <h1 className="font-semibold text-lg">Baixe o plugin</h1>
                <p className="text-muted-foreground">Baixe nosso plugin para integrar seu servidor à loja</p>
                <small className="text-[12px]">Suporte para: Bukkit, Spigot, Velocity, BungeeCord, Sponge</small>
            </div>
            <Button className="gap-2"><DownloadCloud size={18}/> Baixar</Button>
            </div>

        </div>
        
        <section className="mt-10">
            <h1 className="font-semibold text-lg">Como baixar?</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                <StepCardComponent 
                title="Download do plugin"
                desc="Baixe o plugin PloudStore.jar e o coloque na pasta 'plugins' de seu servidor"
                number="1"/>
                <StepCardComponent
                title="Iniciando plugin"
                desc="Inicie ou reinicie o seu servidor. Uma pasta 'PloudStore' será automaticamente gerada na pasta 'plugins'"
                number="2"/>

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