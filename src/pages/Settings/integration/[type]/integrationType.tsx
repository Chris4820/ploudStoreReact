import { useEffect } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { Link, useNavigate, useParams } from "react-router-dom";
import MinecraftIntegrationForm from "../../../../components/dashboard/forms/MinecraftIntegrationForm";


export default function IntegrationTypePage() {
    const params = useParams();
    const integrationType = params.type;
    console.log(integrationType);
    const navigate = useNavigate();

    const allowedIntegrations = ['minecraft', 'slack', 'discord'];

    useEffect(() => {
        if(!integrationType || !allowedIntegrations.includes(integrationType)) {
            navigate('../integration')
        }
    }, [])

     return(
        <>
        <Link className="flex gap-2 items-center text-lg hover:underline mb-5" to={'../integration'}>
            <CgArrowLeft size={20}/>
            Voltar
        </Link>
        {integrationType === "minecraft" && <MinecraftIntegrationForm/>}
        </>
     )


}