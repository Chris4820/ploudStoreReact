import { FaDiscord, FaServer, FaSlack } from "react-icons/fa";
import IntegrationCard from "../components/IntegrationCard";
import SubHeaderSection from "../../../components/commons/subHeader";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { MdOutlineMessage, MdOutlineNotificationsActive } from "react-icons/md";
import { useGetIntegrations } from "../api/store";
import LoadingComponent from "../../../containers/LoadingComponent";
import { StoreIntegrationsProps } from "../api/req";
import IntegrationCard2 from "../components/IntegrationCard2";

export default function IntegrationPage() {

  const {data: integrations, isLoading} = useGetIntegrations();

  console.log(integrations);


  // Função auxiliar para verificar se a integração está ativa
  function isIntegrationActive (type: StoreIntegrationsProps) : boolean {
    if (!integrations) return false;
    console.log("Type: " + type);
    return integrations.some(integration => integration.type === type && integration.isActive);
  }


  if(isLoading) {
    return (
      <LoadingComponent/>
    )
  }

  return (
    <div className="space-y-5">
      {/* Servidores / Jogos */}
      <section>
        <SubHeaderSection
          title="Servidores / Jogos"
          description="Integra os teus servidores de jogos com a loja"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-3">
          <IntegrationCard
            title="Servidor de Jogo"
            description="Liga o teu servidor à loja para executar comandos automaticamente após uma compra."
            Icon={FaServer}
            link="server"
          />

          <IntegrationCard
            title="Discord"
            description="Recebe notificações automáticas ou executa ações no teu servidor Discord com base em eventos da loja."
            Icon={FaDiscord}
            link="discord"
          />
        </div>
      </section>

      {/* Marketing e Análise */}
      <section>
        <SubHeaderSection
          title="Marketing e Análise"
          description="Ferramentas para análise de dados e otimização de conversões"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-3">
          <IntegrationCard2
            title="Google Analytics"
            description="Monitoriza o tráfego da tua loja e obtém dados sobre o comportamento dos visitantes."
            Icon={TbBrandGoogleAnalytics}
            link="analytics/google"
            isActive={isIntegrationActive(StoreIntegrationsProps.GOOGLE_ANALYTICS)}
          />
        </div>
      </section>

      {/* Comunicação e Suporte */}
      <section>
        <SubHeaderSection
          title="Comunicação e Suporte"
          description="Adiciona canais de contacto e apoio ao cliente à tua loja"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-3">
          <IntegrationCard2
            title="Tawk.to"
            description="Integra um chat de suporte em tempo real para falar diretamente com os teus clientes."
            Icon={MdOutlineMessage}
            link="support/tawko"
            isActive={isIntegrationActive(StoreIntegrationsProps.TAWK)}
          />

          <IntegrationCard2
            title="Crisp"
            description="Adiciona o Crisp à tua loja para comunicação instantânea e gestão de conversas com clientes."
            Icon={MdOutlineMessage}
            link="support/crisp"
            isActive={isIntegrationActive(StoreIntegrationsProps.CRISP)}
          />
        </div>
      </section>
  {/* Notificações */}
  <section>
    <SubHeaderSection
      title="Notificações"
      description="Recebe alertas automáticos sobre eventos importantes na loja, como compras ou reembolsos"
    />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-3">
      <IntegrationCard2
        title="Discord"
        description="Recebe notificações em tempo real no teu servidor Discord sobre novas compras, reembolsos, ou outras ações importantes."
        Icon={MdOutlineNotificationsActive}
        link="notification/discord"
        isActive={isIntegrationActive(StoreIntegrationsProps.DISCORD_NOTIFICATION)}
      />

      <IntegrationCard2
        title="Slack"
        description="Recebe alertas automáticos no Slack sempre que houver atividade na loja, como vendas ou pedidos de suporte."
        Icon={FaSlack}
        link="notification/slack"
        isActive={isIntegrationActive(StoreIntegrationsProps.SLACK_NOTIFICATION)}
      />
    </div>
  </section>

    </div>
  );
}
