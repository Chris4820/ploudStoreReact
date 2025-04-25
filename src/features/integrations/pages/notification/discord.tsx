import HeaderSection from "../../../../components/commons/Header"
import { Card, CardContent } from "../../../../components/ui/card"
import DiscordForm from "../../form/discordForm"
import type { IntegrationSchemaFormData } from "../../schema/notification2"
import LoadingComponent from "../../../../containers/LoadingComponent"
import { useGetDiscordNotificationIntegration } from "../../api/store"
import { useUpdateIntegration } from "../../mutation/UpdateIntegrationMutation"
import { StoreIntegrationsProps } from "../../api/req"

export default function DiscordNotificationIntegrationPage() {

  const {data: slackIntegration, isLoading} = useGetDiscordNotificationIntegration();

  const {mutate: updateDiscordIntegration, isPending} = useUpdateIntegration(StoreIntegrationsProps.DISCORD_NOTIFICATION)
  
  if(isLoading) {
    return <LoadingComponent/>
  }

  return (
    <div className="space-y-6">
      <HeaderSection
        title="Discord Notificações"
        description="Configure o Discord para receber notificações de ações importantes"
        autoBack
      />

      <Card>
        <CardContent className="pt-6">
          <DiscordForm
              defaultValues={slackIntegration || undefined}
              isPending={isPending}
              onSubmit={(data: IntegrationSchemaFormData) => updateDiscordIntegration(data)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
