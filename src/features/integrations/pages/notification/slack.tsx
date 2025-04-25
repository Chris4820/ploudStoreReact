
import HeaderSection from "../../../../components/commons/Header";
import { Card, CardContent } from "../../../../components/ui/card"
import { StoreIntegrationsProps } from "../../api/req";
import { useGetSlackNotificationIntegration } from "../../api/store"
import SlackForm from "../../form/slackForm";
import { useUpdateIntegration } from "../../mutation/UpdateIntegrationMutation";
import type { SlackFormData } from "../../schema/notification2";

export default function SlackNotificationIntegrationPage() {

  const {data: slackIntegration, isLoading} = useGetSlackNotificationIntegration();


  const {mutate: updateSlackIntegration, isPending} = useUpdateIntegration(StoreIntegrationsProps.SLACK_NOTIFICATION)


    

  return (
    <div className="space-y-6">
      <HeaderSection
        title="Slack Notificações"
        description="Configure o Slack para receber notificações de ações importantes"
        autoBack
      />
    {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <>
          <Card>
          <CardContent className="pt-6">
            <SlackForm 
            defaultValues={slackIntegration || undefined}
            isPending={isPending}
            onSubmit={(data: SlackFormData) => updateSlackIntegration(data)}
          />
          </CardContent>
      </Card>
          </>
        </div>
    )}
    </div>
  )
}
