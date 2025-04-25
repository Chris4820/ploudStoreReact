import { Info } from "lucide-react";
import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
import SubmitButton from "../../../components/commons/buttons/SubmitButton";
import { Input } from "../../../components/ui/input";
import { useForm } from "react-hook-form";
import { CrispSchema, type CrispSchemaFormData } from "../schema/support";
import { zodResolver } from "@hookform/resolvers/zod";



export type FormProps = {
  defaultValues: CrispSchemaFormData | undefined;
  onSubmit: (data: CrispSchemaFormData) => void;
  isPending: boolean;
}




export default function CrispForm({ defaultValues, onSubmit, isPending }: FormProps) {

  const form = useForm<CrispSchemaFormData>({
            resolver: zodResolver(CrispSchema),
            defaultValues: {
              type: "CRISP",
              isActive: defaultValues?.isActive || false,
              config: {
                websiteId: defaultValues?.config?.websiteId || "",
              }
    
            },
            mode: 'onSubmit',
            reValidateMode: 'onChange',
        })

        // Função para lidar com a submissão
        async function handleSubmit(data: CrispSchemaFormData) {
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
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-white"
                  >
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                  </svg>
                </div>
                <span className="text-sm text-muted-foreground">
                  Conecte seu site ao Crisp para comunicação em tempo real com seus visitantes
                </span>
              </div>
            </div>

            {/* Website ID Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="website-id" className="text-sm font-medium">
                  Website ID
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-80 text-xs">
                        O Website ID pode ser encontrado no painel do Crisp em Configurações &gt; Website &gt; Website
                        Settings.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input {...form.register("config.websiteId")} id="website-id" className="w-full" placeholder="12345678-1234-1234-1234-123456789012" />
              {form.formState.errors.config?.websiteId && (
                <p className="text-xs text-red-500">{form.formState.errors.config.websiteId.message}</p>
              )}
              <p className="text-xs text-muted-foreground">Formato: 12345678-1234-1234-1234-123456789012 (UUID)</p>
            </div>

            {/* Visibility Section */}
            <div className="space-y-2 pt-2">
              <Label htmlFor="visibility" className="text-sm font-medium">
                Visibilidade
              </Label>
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div>
                  <span className="text-sm font-medium">Ativar chat Crisp</span>
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