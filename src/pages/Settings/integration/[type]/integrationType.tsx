import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MinecraftIntegrationForm from "../../../../components/dashboard/forms/MinecraftIntegrationForm";
import BackComponent from "../../../../components/commons/BackComponent";


export default function IntegrationTypePage() {
    const params = useParams();
    const integrationType = params.type;
    const navigate = useNavigate();

    const allowedIntegrations = ['minecraft', 'slack', 'discord'];

    useEffect(() => {
        if(!integrationType || !allowedIntegrations.includes(integrationType)) {
            navigate('../integration')
        }
    }, [])

     return(
        <>
        <BackComponent text="Voltar" toLink="../integration"/>
        {integrationType === "minecraft" && <MinecraftIntegrationForm/>}
        </>
     )


}