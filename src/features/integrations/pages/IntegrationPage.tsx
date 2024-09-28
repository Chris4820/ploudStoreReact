import { FaDiscord, FaServer } from "react-icons/fa";
import IntegrationCard from "../components/IntegrationCard";
import HeaderSection from "../../../components/commons/Header";






export default function IntegrationPage() {

  return(
    <>
    <HeaderSection title="Integrações" description="Integre sua loja com aplicativos externos"/>
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <IntegrationCard
      title="Servidor"
      description="Conecte seu servidor de jogos com sua loja para ativações automáticas!"
      Icon={FaServer}
      link="server"
      />

      <IntegrationCard
      title="Discord"
      description="Conecte seu servidor discord com sua loja para ativações automáticas!"
      Icon={FaDiscord}
      link="discord"
      />
    </section>
    </>
    
  )
}