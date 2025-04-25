import { Info } from "lucide-react";
import { Label } from "../../../components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
import SubmitButton from "../../../components/commons/buttons/SubmitButton";
import { Switch } from "../../../components/ui/switch";
import { Input } from "../../../components/ui/input";
import { TawkSchema, type TawkSchemaFormData } from "../schema/support";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export type FormProps = {
  defaultValues: TawkSchemaFormData | undefined;
  onSubmit: (data: TawkSchemaFormData) => void;
  isPending: boolean;
}





export default function TawkToIntegrationForm({ defaultValues, onSubmit, isPending }: FormProps) {

    const form = useForm<TawkSchemaFormData>({
              resolver: zodResolver(TawkSchema),
              defaultValues: {
                type: "TAWK",
                isActive: defaultValues?.isActive || false,
                config: {
                  propertyId: defaultValues?.config?.propertyId || "",
                  widgetId: defaultValues?.config?.widgetId || "",
                }
      
              },
              mode: 'onSubmit',
              reValidateMode: 'onChange',
          })
  
          // Função para lidar com a submissão
          async function handleSubmit(data: TawkSchemaFormData) {
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
                <img src="/placeholder.svg?height=24&width=24" alt="tawk.to logo" className="h-6 w-6" />
                <span className="text-sm text-muted-foreground">
                  Conecte seu site ao tawk.to para oferecer suporte ao cliente em tempo real
                </span>
              </div>
            </div>

            {/* Property ID Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="property-id" className="text-sm font-medium">
                  Property ID
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-80 text-xs">
                        O Property ID pode ser encontrado no painel do tawk.to em Administração &gt; Propriedade &gt;
                        Configurações da Propriedade.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input {...form.register("config.propertyId")} id="property-id" className="w-full" placeholder="6123456789abcdef1234567" />
              <p className="text-xs text-muted-foreground">Insira o ID da propriedade do seu widget tawk.to</p>
            </div>

            {/* Widget ID Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="widget-id" className="text-sm font-medium">
                  Widget ID
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-80 text-xs">
                        O Widget ID pode ser encontrado no painel do tawk.to em Administração &gt; Widgets &gt;
                        Configurações do Widget.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input {...form.register("config.widgetId")} id="widget-id" className="w-full" placeholder="default" />
              <p className="text-xs text-muted-foreground">
                Geralmente é "default" a menos que você tenha widgets personalizados
              </p>
            </div>

            {/* Visibility Section */}
            <div className="space-y-2 pt-2">
              <Label htmlFor="visibility" className="text-sm font-medium">
                Visibilidade
              </Label>
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div>
                  <span className="text-sm font-medium">Ativar chat tawk.to</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Quando ativado, o widget de chat será exibido em seu site
                  </p>
                </div>
                <Switch
                 defaultChecked={form.getValues("isActive")}
                 onCheckedChange={(checked) => form.setValue("isActive", checked, {shouldDirty: true})} // Atualiza o valor de 'visible'
                      id="visibility" />
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