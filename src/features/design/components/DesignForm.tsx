import { zodResolver } from "@hookform/resolvers/zod"
import designSchema, { type designFormData } from "../Schema/designSchema"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Switch } from "../../../components/ui/switch"
import { Button } from "../../../components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../../../components/ui/form"
import { Paintbrush, Moon, Sun, Layout, Palette, Check, Loader2 } from "lucide-react"
import ColorPickerComponent from "../../../components/colorPickerComponent"
import { useStore } from "../../../provider/Store/StoreContext"

type DesignFormProps = {
  onSubmit: (data: designFormData) => void
  isLoading: boolean
}

export default function DesignForm({ onSubmit, isLoading }: DesignFormProps) {
  const store = useStore();
  const form = useForm<designFormData>({
    resolver: zodResolver(designSchema),
    defaultValues: store,
    mode: 'onSubmit',
})


function submitForm(data: designFormData) {
        form.reset(data);
        onSubmit(data);
    }


  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Design da Loja</h1>
          <p className="text-muted-foreground mt-1">Personalize a aparência da sua loja</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <Tabs defaultValue="colors" className="w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <TabsList className="mb-4 md:mb-0">
                <TabsTrigger value="colors" className="flex items-center">
                  <Palette className="h-4 w-4 mr-2" />
                  Cores
                </TabsTrigger>
                <TabsTrigger value="layout" className="flex items-center">
                  <Layout className="h-4 w-4 mr-2" />
                  Layout
                </TabsTrigger>
              </TabsList>

              <Button type="submit" className="ml-auto" disabled={!form.formState.isDirty || isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Atualizando...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Atualizar
                  </>
                )}
              </Button>
            </div>

            <TabsContent value="colors" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Paintbrush className="h-5 w-5 mr-2 text-primary" />
                    Paleta de Cores
                  </CardTitle>
                  <CardDescription>Escolha as cores que melhor representam a identidade da sua marca</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-2">
                        <h3 className="font-medium">Cor Principal</h3>
                        <p className="text-sm text-muted-foreground">Usada em botões, links e elementos de destaque</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-muted/30">
                        <ColorPickerComponent
                          color={form.getValues("primaryColor")}
                          onColorChange={(color) => form.setValue("primaryColor", color, { shouldDirty: true })}
                          title="Cor principal da loja"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col space-y-2">
                        <h3 className="font-medium">Cor Secundária</h3>
                        <p className="text-sm text-muted-foreground">
                          Usada em acentos, bordas
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg bg-muted/30">
                        <ColorPickerComponent
                          color={form.getValues("secondaryColor")}
                          onColorChange={(color) => form.setValue("secondaryColor", color, { shouldDirty: true })}
                          title="Cor secundária da loja"
                        />
                      </div>
                    </div>

                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Moon className="h-5 w-5 mr-2 text-primary" />
                    Configurações de Tema
                  </CardTitle>
                  <CardDescription>Defina as preferências de tema para sua loja</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="defaultDarkTheme"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base flex items-center">
                              <Moon className="h-4 w-4 mr-2" />
                              Tema escuro padrão
                            </FormLabel>
                            <FormDescription>
                              Quando ativado, sua loja será exibida no tema escuro por padrão
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              defaultChecked={form.getValues(field.name)}
                              onCheckedChange={(checked) => form.setValue(field.name, checked, {shouldDirty: true})} // Atualiza o valor de 'visible'
                              className="accent-primary"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="enableChangeTheme"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base flex items-center">
                              <Sun className="h-4 w-4 mr-2" />
                              Permitir troca de tema
                            </FormLabel>
                            <FormDescription>
                              Permite que os usuários alternem entre tema claro e escuro
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  )
}

