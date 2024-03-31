import { FaDiscord, FaSlack } from "react-icons/fa";
import { TbBrandMinecraft } from "react-icons/tb";
import { Button } from "../../../components/ui/button";
import {  useNavigate } from "react-router-dom";
import HeaderSection from "../../../components/commons/Header";
import { t } from "i18next";




export default function IntegrationPage() {
    const navigate = useNavigate();

    function RedirectHandle(type: string) {
        return navigate(`${type}`);
    }

    return(
        <>
        <HeaderSection title={t("settingsPage.integrationSection.integration")} description={t("settingsPage.integrationSection.description")}/>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
            <div className="border rounded-lg p-5 relative h-[200px]">
                <div className="flex gap-2 items-center">
                    <TbBrandMinecraft size={24} className="text-purple-600"/>
                    <h1 className="font-semibold">Minecraft</h1>
                </div>
                <p className="text-muted-foreground mt-1">{t("settingsPage.integrationSection.configureMinecraft.description")}</p>
                <div className="absolute bottom-5 right-5">
                    <Button onClick={() => RedirectHandle('minecraft')}>Configurar</Button>
                </div>
            </div>

            <div className="border rounded-lg p-5 relative h-[200px]">
                <div className="flex gap-2 items-center">
                    <FaDiscord size={24} className="text-purple-600"/>
                    <h1 className="font-semibold">{t("configure")}</h1>
                </div>
                <p className="text-muted-foreground mt-1">{t("settingsPage.integrationSection.configureDiscord.description")}</p>
                <div className="absolute bottom-5 right-5">
                <Button onClick={() => RedirectHandle('discord')}>{t("configure")}</Button>
                </div>
            </div>

            <div className="border rounded-lg p-5 relative h-[200px]">
                <div className="flex gap-2 items-center">
                    <FaSlack size={24} className="text-purple-600"/>
                    <h1 className="font-semibold">Slack</h1>
                </div>
                <p className="text-muted-foreground mt-1">{t("settingsPage.integrationSection.configureSlack.description")}</p>
                <div className="absolute bottom-5 right-5">
                <Button onClick={() => RedirectHandle('slack')}>{t("configure")}</Button>
                </div>
            </div>
        </div>
        </>
    )
}