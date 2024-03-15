import { DownloadCloud } from "lucide-react";
import { Button } from "../../ui/button";
import StepCardComponent from "../stepCard";
import HeaderSection from "../../commons/Header";



export default function MinecraftIntegrationForm() {
    return(
        <>
        <HeaderSection title="Minecraft" description="Integre o minecraft com sua loja"/>
        <div className="w-full rounded-lg p-5 flex justify-between gap-5 items-center flex-wrap border mt-5">
            <div className="max-w-[400px]">
                <h1 className="font-semibold text-lg">Baixe o plugin</h1>
                <p className="text-muted-foreground">Baixe nosso plugin para integrar seu servidor à loja</p>
                <small className="text-[12px]">Suporte para: Bukkit, Spigot, Velocity, BungeeCord, Sponge</small>
            </div>
            <Button className="gap-2"><DownloadCloud size={18}/> Baixar</Button>
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