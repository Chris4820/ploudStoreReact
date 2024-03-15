import { FaDiscord, FaSlack } from "react-icons/fa";
import { TbBrandMinecraft } from "react-icons/tb";
import { Button } from "../../../components/ui/button";
import {  useNavigate } from "react-router-dom";
import HeaderSection from "../../../components/commons/Header";




export default function IntegrationPage() {
    const navigate = useNavigate();

    function RedirectHandle(type: string) {
        return navigate(`${type}`);
    }

    return(
        <>
        <HeaderSection title="Integrações" description="Conecte sua loja com diversas aplicações"/>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
            <div className="border rounded-lg p-5 relative h-[200px]">
                <div className="flex gap-2 items-center">
                    <TbBrandMinecraft size={24} className="text-purple-600"/>
                    <h1 className="font-semibold">Minecraft</h1>
                </div>
                <p className="text-muted-foreground mt-1">Conecte a loja ao seu servidor de Minecraft
                e configure as ativações automáticas dos produtos!</p>
                <div className="absolute bottom-5 right-5">
                    <Button onClick={() => RedirectHandle('minecraft')}>Configurar</Button>
                </div>
            </div>

            <div className="border rounded-lg p-5 relative h-[200px]">
                <div className="flex gap-2 items-center">
                    <FaDiscord size={24} className="text-purple-600"/>
                    <h1 className="font-semibold">Discord</h1>
                </div>
                <p className="text-muted-foreground mt-1">Conecte a loja ao seu servidor Discord, para configurar
                avisos de novas compras...</p>
                <div className="absolute bottom-5 right-5">
                <Button onClick={() => RedirectHandle('discord')}>Configurar</Button>
                </div>
            </div>

            <div className="border rounded-lg p-5 relative h-[200px]">
                <div className="flex gap-2 items-center">
                    <FaSlack size={24} className="text-purple-600"/>
                    <h1 className="font-semibold">Slack</h1>
                </div>
                <p className="text-muted-foreground mt-1">Conecte a loja ao seu servidor Slack, para configurar
                avisos de novas compras...</p>
                <div className="absolute bottom-5 right-5">
                <Button onClick={() => RedirectHandle('slack')}>Configurar</Button>
                </div>
            </div>
        </div>
        </>
    )
}