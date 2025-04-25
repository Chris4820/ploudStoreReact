import { Info } from "lucide-react";
import { Label } from "../../../components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
import { Input } from "../../../components/ui/input";
import { Switch } from "../../../components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiscordSchema, type DiscordFormData } from "../schema/notification2";
import SubmitButton from "../../../components/commons/buttons/SubmitButton";

export type DiscordFormProps = {
  defaultValues: DiscordFormData | undefined;
  onSubmit: (data: DiscordFormData) => void;
  isPending: boolean;
}



export default function DiscordForm({ defaultValues, onSubmit, isPending }: DiscordFormProps) {

  const form = useForm<DiscordFormData>({
            resolver: zodResolver(DiscordSchema),
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

        async function handleSubmit(data: DiscordFormData) {
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
    <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
            {/* Webhook URL Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label

                htmlFor="webhook-url" className="text-sm font-medium">
                  URL do Webhook
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-80 text-xs">
                        Você pode criar um webhook no Discord indo em Configurações do Servidor &gt; Integrações &gt;
                        Webhooks &gt; Novo Webhook. Copie a URL do webhook e cole aqui.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                {...form.register("config.webhookUrl")}
                id="webhook-url"
                className="w-full"
                placeholder="https://discord.com/api/webhooks/1234567890/abcdeFgHiJkLmNoPqRsTuVwXyZ"
              />
              <p className="text-xs text-muted-foreground">Cole a URL completa do webhook do Discord</p>
            </div>

            {/* Visibility Section */}
            <div className="space-y-2">
              <Label htmlFor="visibility" className="text-sm font-medium">
                Visibilidade
              </Label>
              <div className="flex items-center justify-between border p-3 rounded-md">
                <span className="text-sm">Ativar notificações do Discord</span>
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

            <div className="flex justify-end">
              <SubmitButton
                             text="Salvar configurações" 
                             isLoading={isPending}
                             enable={!form.formState.isDirty} 
                             />
            </div>
          </form>
  )
}