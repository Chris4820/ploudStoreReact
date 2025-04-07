"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Input } from "../../../components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { useUser } from "../../../provider/User/UserContext"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form"
import { FlagPT } from "../../../components/flags/pt"
import { FlagUS } from "../../../components/flags/us"
import { FlagBR } from "../../../components/flags/br"
import { FlagSE } from "../../../components/flags/se"
import type { UserSettingsFormData } from "../Schema/UserSettingsSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import UserSettingsSchema from "../Schema/UserSettingsSchema"
import { t } from "../../../lib/reacti18next/i18n"
import { useUpdateUserSettings } from "../mutation/updateSettingsMutation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import {  Globe, Languages, MapPin, User } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Separator } from "../../../components/ui/separator"
import HeaderSection from "../../../components/commons/Header"

export default function ProfilePage() {
  const user = useUser()

  const { mutate: updateUserInformation, isPending } = useUpdateUserSettings()

  const form = useForm<UserSettingsFormData>({
    resolver: zodResolver(UserSettingsSchema),
    defaultValues: user,
    mode: "onSubmit",
  })

  function submitForm(data: UserSettingsFormData) {
    updateUserInformation(data)
    form.reset(data)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <HeaderSection
       title="Perfil"
       description="Gerencie seu perfil"
       autoBack/>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-0">
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Gerencie seus dados pessoais</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-32 w-32 border-4 border-background">
                  <AvatarImage src="https://github.com/shadcn.png" alt={user?.name || "User"} />
                  <AvatarFallback className="text-2xl">
                    {user.shortName}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>

              <div className="w-full mt-6 space-y-2">
                <div className="flex items-center p-3 rounded-lg bg-muted/50">
                  <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Idioma</p>
                    <p className="text-sm text-muted-foreground">{user?.language === "pt" ? "Português" : "English"}</p>
                  </div>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-muted/50">
                  <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Localidade</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.locale === "pt-PT"
                        ? "Portugal"
                        : user?.locale === "pt-BR"
                          ? "Brasil"
                          : user?.locale === "en-US"
                            ? "United States"
                            : user?.locale === "sv-SE"
                              ? "Sverige"
                              : "Não definido"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-muted/50">
                  <Languages className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Fuso Horário</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.timezone?.replace("_", " ").replace("/", ", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Conta</CardTitle>
              <CardDescription>Atualize suas preferências e informações pessoais</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="profile" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Perfil
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    Preferências
                  </TabsTrigger>
                </TabsList>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(submitForm)}>
                    <TabsContent value="profile" className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("setup.name")}:</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} className="max-w-md" placeholder="Seu nome completo" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="pt-4">
                        <Button
                          type="submit"
                          className="w-full sm:w-auto"
                          disabled={!form.formState.isDirty || isPending}
                        >
                          {isPending ? "Atualizando..." : t("update")}
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="preferences" className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="language"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("setup.idiom")}:</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione um idioma" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="pt">
                                    <div className="flex items-center gap-2">
                                        <FlagPT className="w-5 h-5" />
                                      Português
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="en">
                                    <div className="flex items-center gap-2">
                                      <FlagUS className="w-5 h-5" />
                                      English
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="locale"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Localidade</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma localidade" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="pt-PT">
                                    <div className="flex items-center gap-2">
                                      <FlagPT className="w-5 h-5" />
                                      Portugal
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="en-US">
                                    <div className="flex items-center gap-2">
                                      <FlagUS className="w-5 h-5" />
                                      United States
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="pt-BR">
                                    <div className="flex items-center gap-2">
                                      <FlagBR className="w-5 h-5" />
                                      Brasil
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="sv-SE">
                                    <div className="flex items-center gap-2">
                                      <FlagSE className="w-5 h-5" />
                                      Sverige
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                        control={form.control}
                        name="timezone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fuso Horário</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione um fuso horário" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-[300px]">
                                {/* Europa */}
                                <SelectGroup>
                                  <SelectLabel className="font-semibold text-primary">Europa</SelectLabel>
                                  <Separator className="my-1" />
                                  <SelectItem value="Europe/Lisbon">
                                    <div className="flex items-center gap-2">
                                      <FlagPT className="w-5 h-5" />
                                      Lisboa (GMT+0/+1)
                                    </div>
                                  </SelectItem>
                                </SelectGroup>

                                {/* América */}
                                <SelectGroup className="mt-2">
                                  <SelectLabel className="font-semibold text-primary">América</SelectLabel>
                                  <Separator className="my-1" />
                                  <SelectItem value="America/Sao_Paulo">
                                    <div className="flex items-center gap-2">
                                      <FlagBR className="w-5 h-5" />
                                      São Paulo (GMT-3)
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="America/New_York">
                                    <div className="flex items-center gap-2">
                                      <FlagUS className="w-5 h-5" />
                                      Nova Iorque (GMT-5/-4)
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="America/Chicago">
                                    <div className="flex items-center gap-2">
                                      <FlagUS className="w-5 h-5" />
                                      Chicago (GMT-6/-5)
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="America/Los_Angeles">
                                    <div className="flex items-center gap-2">
                                      <FlagUS className="w-5 h-5" />
                                      Los Angeles (GMT-8/-7)
                                    </div>
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          className="w-full sm:w-auto"
                          disabled={!form.formState.isDirty || isPending}
                        >
                          {isPending ? "Atualizando..." : t("update")}
                        </Button>
                      </div>
                    </TabsContent>
                  </form>
                </Form>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

