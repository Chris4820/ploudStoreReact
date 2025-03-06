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



export default function DiscordIntegrationSection() {


    const { mutate: createServer} = useCreateServer("discord");

    function createHandler(name: string) {
        if(!name) {
            return toast("O nome não pode ser vazio");
        }
        createServer(name);
      }


    const { data: tokens, isLoading} = useGetServers("discord");
    return(
        <>
        <div className="flex justify-between items-center">
            <HeaderSection backLink="../integration" title="Discord" description="Integre seu servidor Discord com sua loja!"/>
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
                <h1 className="font-semibold text-lg">Convide o bot</h1>
                <p className="text-muted-foreground">Convide nosso bot para seu servidor</p>
            </div>
            <Button className="gap-2"><DownloadCloud size={18}/>Conectar</Button>
            </div>

        </div>
        
        <section className="mt-10">
          <h1 className="font-semibold text-lg">Como conectar o bot do Discord à loja?</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            <StepCardComponent
              title="Convite do bot"
              desc="Clique no link de convite fornecido para adicionar o bot da loja ao seu servidor Discord. Escolha o servidor desejado e autorize as permissões necessárias."
              number="1"
            />
            <StepCardComponent
              title="Verificando o bot"
              desc="Após adicionar o bot, vá até o servidor onde o bot foi adicionado. Certifique-se de que ele está online e com as permissões corretas para enviar mensagens e ler canais."
              number="2"
            />
            <StepCardComponent
              title="Vinculando o bot"
              desc="No canal do Discord, utilize o comando '/link <seu-token>'. Substitua '<seu-token>' pelo token fornecido no painel da loja para vincular o bot ao seu servidor."
              number="3"
            />
            <StepCardComponent
              title="Confirmação"
              desc="Após executar o comando, você verá uma mensagem de confirmação no Discord, indicando que o bot foi vinculado com sucesso ao seu servidor."
              number="4"
            />
          </div>
        </section>

        </>
    )
}