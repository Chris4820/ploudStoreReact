import { Info } from "lucide-react"
import SubmitButton from "../../../components/commons/buttons/SubmitButton"
import HeaderSection from "../../../components/commons/Header"
import { Input } from "../../../components/ui/input"
import { Switch } from "../../../components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip"
import { Card, CardContent } from "../../../components/ui/card"
import { GoogleAnalyticsSchema, type GoogleAnalyticsSchemaFormData } from "../schema/analytics"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

type FormProps = {
  defaultValues: GoogleAnalyticsSchemaFormData | undefined;
  onSubmit: (data: GoogleAnalyticsSchemaFormData) => void;
  isPending: boolean;
}


export default function GoogleAnalyticsIntegrationForm({ defaultValues, onSubmit, isPending }: FormProps) {

      const form = useForm<GoogleAnalyticsSchemaFormData>({
                resolver: zodResolver(GoogleAnalyticsSchema),
                defaultValues: {
                  type: "GA",
                  isActive: defaultValues?.isActive || false,
                  config: {
                    measurementId: defaultValues?.config?.measurementId || "",
                  }
        
                },
                mode: 'onSubmit',
                reValidateMode: 'onChange',
            })
    
            // Função para lidar com a submissão
            async function handleSubmit(data: GoogleAnalyticsSchemaFormData) {
                  try {
                    onSubmit(data); // Executa a mutation e obtém os dados atualizados
                    form.reset(data); // Atualiza o formulário com os novos dados
                  } catch (error) {
                    console.error("Erro ao salvar integração:", error);
                    // Opcional: Exibir mensagem de erro ao usuário
                    form.setError("root", { message: "Erro ao salvar as configurações. Tente novamente." });
                  }
                }


  return (
    <div className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
      <HeaderSection
        title="Google Analytics"
        description="Configure o Google Analytics para receber notificações de ações importantes"
        autoBack
      />

      <Card>
        <CardContent className="pt-6">
          <form>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="col-span-1 md:col-span-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label htmlFor="token" className="text-sm font-medium">
                        Token de Medição
                      </label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-80 text-xs">
                              O token de medição do Google Analytics é necessário para rastrear eventos em seu site.
                              Você pode encontrá-lo nas configurações da sua conta do Google Analytics.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input {...form.register("config.measurementId")} id="token" placeholder="G-XXXXXXXXXX" className="w-full" />
                    <p className="text-xs text-muted-foreground">Exemplo: G-XXXXXXXXXX ou UA-XXXXXXXX-X</p>
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="space-y-2">
                    <label htmlFor="visibility" className="text-sm font-medium">
                      Visibilidade
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Switch
                      defaultChecked={form.getValues("isActive")}
                      onCheckedChange={(checked) => form.setValue("isActive", checked, {shouldDirty: true})} // Atualiza o valor de 'visible'
                      id="visibility" />
                    </div>
                    <p className="text-xs text-muted-foreground">Ative para habilitar o rastreamento</p>
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
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}