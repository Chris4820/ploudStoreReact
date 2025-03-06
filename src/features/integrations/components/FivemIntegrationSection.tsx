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



export default function FiveMIntegrationSection() {

    function createHandler(name: string) {
        if(!name) {
            return toast("O nome não pode ser vazio");
        }
        createServer(name);
      }

      const { mutate: createServer} = useCreateServer("server");

    const { data: tokens, isLoading} = useGetServers("server");


    return(
        <>
        <div className="flex justify-between items-center">
            <HeaderSection backLink="../" title="FiveM" description="Integre seu servidor FiveM com sua loja!"/>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <StepCardComponent 
                title="Baixe os arquivos do script"
                desc="Faça o download e use um descompactador de arquivos para extrair na pasta de resources do seu servidor."
                number="1"/>
                <StepCardComponent
                title="Insira o token de identificação"
                desc="Copie a sua chave privada e coloque-a no campo 'token' do arquivo config.js."
                number="2"/>
                <StepCardComponent 
                title="Coloque o script para iniciar"
                desc="Vá no arquivo server.cfg e coloque 'start centralcart' no final para iniciar o script."
                number="3"/>
                <StepCardComponent
                title="Pronto!"
                desc="Agora basta reiniciar o servidor e você verá uma mensagem informando que o script foi carregado com sucesso!"
                number="4"/>
            </div>
        </section>
        </>
    )
}