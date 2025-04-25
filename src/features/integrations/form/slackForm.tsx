import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
import { Info } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { SlackSchema, type SlackFormData } from "../schema/notification2";
import SubmitButton from "../../../components/commons/buttons/SubmitButton";





export type SlackFormProps = {
  defaultValues: SlackFormData | undefined;
  onSubmit: (data: SlackFormData) => void;
  isPending: boolean;
}


export default function SlackForm({ defaultValues, onSubmit, isPending }: SlackFormProps) {


  const form = useForm<SlackFormData>({
          resolver: zodResolver(SlackSchema),
          defaultValues: {
            
            isActive: defaultValues?.isActive || false,
            config: {
              webhookUrl: defaultValues?.config?.webhookUrl || "",
              notifications: {
                LOW_STOCK: defaultValues?.config?.notifications?.LOW_STOCK || false,
                NEW_PAYMENT: defaultValues?.config?.notifications?.NEW_PAYMENT || false,
              },
            }
  
          },
          mode: 'onSubmit',
      })

      async function handleSubmit(data: SlackFormData) {
                  try {
                    onSubmit(data); // Executa a mutation e obtém os dados atualizados
                    form.reset(data); // Atualiza o formulário com os novos dados
                  } catch (error) {
                    console.error("Erro ao salvar integração:", error);
                    // Opcional: Exibir mensagem de erro ao usuário
                    form.setError("root", { message: "Erro ao salvar as configurações. Tente novamente." });
                  }
                }

  return(
    <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 text-[#4A154B]"
                  >
                    <path d="M5.042 11.866c0 1.155-.93 2.085-2.085 2.085A2.085 2.085 0 0 1 .872 11.866c0-1.155.93-2.085 2.085-2.085h2.085v2.085zm1.042 0c0-1.155.93-2.085 2.084-2.085 1.155 0 2.085.93 2.085 2.085v5.212c0 1.155-.93 2.085-2.085 2.085-1.155 0-2.084-.93-2.084-2.085v-5.212zm2.084-8.338c-1.155 0-2.084-.93-2.084-2.085C6.084.288 7.014-.642 8.17-.642c1.154 0 2.084.93 2.084 2.085v2.085H8.168zm0 1.042c1.155 0 2.085.93 2.085 2.085 0 1.155-.93 2.085-2.085 2.085H2.957c-1.155 0-2.085-.93-2.085-2.085 0-1.155.93-2.085 2.085-2.085h5.211zm8.339 2.085c0-1.155.93-2.085 2.085-2.085 1.155 0 2.085.93 2.085 2.085 0 1.155-.93 2.085-2.085 2.085h-2.085V6.655zm-1.042 0c0 1.155-.93 2.085-2.085 2.085-1.155 0-2.085-.93-2.085-2.085V1.443c0-1.155.93-2.085 2.085-2.085 1.155 0 2.085.93 2.085 2.085v5.212zm-2.085 8.338c1.155 0 2.085.93 2.085 2.085 0 1.155-.93 2.085-2.085 2.085-1.155 0-2.085-.93-2.085-2.085v-2.085h2.085zm0-1.042c-1.155 0-2.085-.93-2.085-2.085 0-1.155.93-2.085 2.085-2.085h5.211c1.155 0 2.085.93 2.085 2.085 0 1.155-.93 2.085-2.085 2.085h-5.211z" />
                  </svg>
                </div>
                <span className="text-sm text-muted-foreground">
                  Receba notificações importantes diretamente em seu canal do Slack
                </span>
              </div>
            </div>

            {/* Webhook URL Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="webhook-url" className="text-sm font-medium">
                  Webhook URL
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-80 text-xs">
                        O Webhook URL é fornecido pelo Slack quando você cria um app ou configura Incoming Webhooks para
                        seu workspace.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {form.formState.errors.config?.webhookUrl && (
                <p className="text-sm text-red-500">{form.formState.errors.config?.webhookUrl.message}</p>
              )}

              <Input
                {...form.register("config.webhookUrl")}
                id="webhook-url"
                className="w-full font-mono text-sm"
                placeholder="https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
              />
              <p className="text-xs text-muted-foreground">
                Formato: https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
              </p>
            </div>

            {/* Visibility Section */}
            <div className="space-y-2 pt-2">
              <Label htmlFor="visibility" className="text-sm font-medium">
                Visibilidade
              </Label>
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div>
                  <span className="text-sm font-medium">Ativar notificações do Slack</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Quando ativado, as notificações serão enviadas para o canal do Slack
                  </p>
                </div>
                <Switch
                defaultChecked={form.getValues("isActive")}
                onCheckedChange={(checked) => form.setValue("isActive", checked, {shouldDirty: true})} // Atualiza o valor de 'visible'
                id="visibility" />
              </div>
            </div>

            {/* Notification Types Section */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Tipos de Notificações</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="border p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-orders" className="text-sm cursor-pointer">
                      Novos pedidos
                    </Label>
                    <Switch
                    defaultChecked={form.getValues("config.notifications.NEW_PAYMENT")}
                    onCheckedChange={(checked) => form.setValue("config.notifications.NEW_PAYMENT", checked, {shouldDirty: true})} // Atualiza o valor de 'visible' 
                    id="new-orders" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Notificações quando houver um novo pedido</p>
                </div>

                <div className="border p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="low-stock" className="text-sm cursor-pointer">
                      Estoque baixo
                    </Label>
                    <Switch
                    defaultChecked={form.getValues("config.notifications.LOW_STOCK")}
                    onCheckedChange={(checked) => form.setValue("config.notifications.LOW_STOCK", checked, {shouldDirty: true})} // Atualiza o valor de 'visible'  
                    id="low-stock" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Notificações quando produtos estiverem com estoque baixo
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <SubmitButton
                             text="Salvar configurações" 
                             isLoading={isPending}
                             enable={!form.formState.isDirty} 
                             />
            </div>
          </form>
  )
}