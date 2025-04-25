import HeaderSection from "../../../../components/commons/Header"
import { Card, CardContent } from "../../../../components/ui/card"
import LoadingComponent from "../../../../containers/LoadingComponent";
import { StoreIntegrationsProps } from "../../api/req";
import { useGetIntegration } from "../../api/store";
import TawkToIntegrationForm from "../../form/tawkForm";
import { useUpdateIntegration } from "../../mutation/UpdateIntegrationMutation";
import type { TawkSchemaFormData } from "../../schema/support";






export default function TawkToIntegrationPage() {


  const {data: crispIntegration, isLoading} = useGetIntegration("TAWK");
    
      const {mutate: updateDiscordIntegration, isPending} = useUpdateIntegration(StoreIntegrationsProps.TAWK)
      
      if(isLoading) {
        return <LoadingComponent/>
      }

  return (
    <div className="space-y-6">
      <HeaderSection
        title="tawk.to Chat"
        description="Configure o widget de chat tawk.to para comunicação com seus clientes"
        autoBack
      />

      <Card>
        <CardContent className="pt-6">

          <TawkToIntegrationForm
          defaultValues={crispIntegration as TawkSchemaFormData}
          onSubmit={updateDiscordIntegration}
          isPending={isPending}
          />
          
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-sm font-medium mb-2">Como encontrar suas credenciais tawk.to</h3>
          <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-5">
            <li>Faça login na sua conta tawk.to</li>
            <li>Vá para Administração &gt; Propriedade &gt; Configurações da Propriedade</li>
            <li>Copie o Property ID mostrado na página</li>
            <li>Para o Widget ID, vá para Administração &gt; Widgets</li>
            <li>Selecione seu widget e copie o Widget ID (geralmente "default")</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
