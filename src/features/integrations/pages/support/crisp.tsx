import HeaderSection from "../../../../components/commons/Header"
import { Card, CardContent } from "../../../../components/ui/card"
import CrispForm from "../../form/crispForm"
import LoadingComponent from "../../../../containers/LoadingComponent"
import { useUpdateIntegration } from "../../mutation/UpdateIntegrationMutation"
import { StoreIntegrationsProps } from "../../api/req"
import { useGetIntegration } from "../../api/store"
import type { CrispSchemaFormData } from "../../schema/support"

export default function CrispIntegrationPage() {


    const {data: crispIntegration, isLoading} = useGetIntegration("CRISP");
  
    const {mutate: updateDiscordIntegration, isPending} = useUpdateIntegration(StoreIntegrationsProps.CRISP)
    
    if(isLoading) {
      return <LoadingComponent/>
    }



  return (
    <div className="space-y-6">
      <HeaderSection
        title="Crisp Chat"
        description="Configure o Crisp para oferecer suporte ao cliente em tempo real"
        autoBack
      />

      <Card>
        <CardContent className="pt-6">
          <CrispForm
            defaultValues={crispIntegration as CrispSchemaFormData}
            onSubmit={(data) => {
              updateDiscordIntegration(data)
            }}
            isPending={isPending}
          />
          
        </CardContent>
      </Card>

    </div>
  )
}
