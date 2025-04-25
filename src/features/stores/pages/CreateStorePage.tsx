"use client"

import { useState } from "react"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { ArrowLeft, ArrowRight, Check, Sparkles, Zap, Snowflake, Star, Store, Gamepad2, CreditCard } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { Textarea } from "../../../components/ui/textarea"
import createStoreSchema, { StorePlansEnum, type CreateStoreFormData } from "../schema/createStoreSchema"
import { useCreateStore } from "../mutations/createStoreMutation"
import SubmitButton from "../../../components/commons/buttons/SubmitButton"
import GameCardComponent from "../components/gameCardComponent"
import { Badge } from "../../../components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Separator } from "../../../components/ui/separator"

export default function CreateStorePage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectGameId, setSelectGameId] = useState("MINECRAFT")
  const [selectedPlan, setSelectedPlan] = useState<StorePlansEnum>(StorePlansEnum.basic)

  const handleGameType = (gameType: string) => {
    if (gameType === "MINECRAFT" || gameType === "FIVEM" || gameType === "REDDEAD") {
      setSelectGameId(gameType)
      setValue("gameType", gameType)
    }
  }

  const handlePlanSelect = (plan: StorePlansEnum) => {
    setSelectedPlan(plan)
    setValue("plan", plan)
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    trigger,
    getValues,
    watch,
  } = useForm<CreateStoreFormData>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      gameType: "MINECRAFT",
      currency: "eur",
      plan: StorePlansEnum.basic,
    },
    mode: "onChange",
  })

  const { mutate: createStore, isPending } = useCreateStore()

  async function onSubmitCreateStore(data: CreateStoreFormData) {
    createStore(data)
  }

  // Função para avançar para o próximo passo
  const goToNextStep = async () => {
    // Validar os campos do passo atual
    let fieldsToValidate: (keyof CreateStoreFormData)[] = []

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["name", "description", "subDomain", "currency"]
        break
      case 2:
        fieldsToValidate = ["gameType"]
        break
      case 3:
        fieldsToValidate = ["plan"]
        break
    }

    const isStepValid = await trigger(fieldsToValidate)

    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
      // Rolar para o topo quando mudar de etapa
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Função para voltar ao passo anterior
  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    // Rolar para o topo quando mudar de etapa
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Observar os campos para validação em tempo real
  const watchedFields = watch()

  // Verificar se o passo atual está válido
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          !!watchedFields.name &&
          !!watchedFields.description &&
          !!watchedFields.subDomain &&
          !errors.name &&
          !errors.description &&
          !errors.subDomain
        )
      case 2:
        return !!watchedFields.gameType && !errors.gameType
      case 3:
        return !!watchedFields.plan && !errors.plan
      default:
        return false
    }
  }

  return (
    <section className="container py-8 space-y-8">
      <div className="flex items-center">
        <Button className="gap-1 items-center text-base" onClick={() => navigate("/")} variant={"link"}>
          <ArrowLeft className="mt-[2px]" size={18} />
          Voltar
        </Button>
      </div>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Crie sua loja de jogos</h1>
        <p className="text-muted-foreground text-center mb-8">
          Configure sua loja personalizada e comece a vender em minutos
        </p>

        {/* Indicador de progresso - Versão Mobile */}
        <div className="md:hidden mb-6">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-medium">
              Etapa {currentStep} de 4:{" "}
              {currentStep === 1 ? "Informações" : currentStep === 2 ? "Jogo" : currentStep === 3 ? "Plano" : "Revisão"}
            </span>
            <span className="text-sm font-medium">{Math.round((currentStep / 4) * 100)}%</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full mt-2">
            <div
              className="h-full bg-violet-500 rounded-full transition-all"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Indicador de progresso - Versão Desktop */}
        <div className="hidden md:block mb-8">
          <div className="flex items-center justify-between">
            <div
              className={`flex flex-col items-center ${
                currentStep >= 1 ? "text-violet-600 dark:text-violet-400" : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= 1
                    ? "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                1
              </div>
              <span className="text-sm font-medium">Informações</span>
            </div>

            <div className="flex-1 h-1 mx-4 bg-muted">
              <div
                className="h-full bg-violet-500 dark:bg-violet-400 transition-all"
                style={{ width: currentStep >= 2 ? "100%" : "0%" }}
              ></div>
            </div>

            <div
              className={`flex flex-col items-center ${
                currentStep >= 2 ? "text-violet-600 dark:text-violet-400" : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= 2
                    ? "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              <span className="text-sm font-medium">Jogo</span>
            </div>

            <div className="flex-1 h-1 mx-4 bg-muted">
              <div
                className="h-full bg-violet-500 dark:bg-violet-400 transition-all"
                style={{ width: currentStep >= 3 ? "100%" : "0%" }}
              ></div>
            </div>

            <div
              className={`flex flex-col items-center ${
                currentStep >= 3 ? "text-violet-600 dark:text-violet-400" : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= 3
                    ? "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
              <span className="text-sm font-medium">Plano</span>
            </div>

            <div className="flex-1 h-1 mx-4 bg-muted">
              <div
                className="h-full bg-violet-500 dark:bg-violet-400 transition-all"
                style={{ width: currentStep >= 4 ? "100%" : "0%" }}
              ></div>
            </div>

            <div
              className={`flex flex-col items-center ${
                currentStep >= 4 ? "text-violet-600 dark:text-violet-400" : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= 4
                    ? "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                4
              </div>
              <span className="text-sm font-medium">Revisão</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmitCreateStore)} className="space-y-8">
          {/* Passo 1: Informações da Loja */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>Preencha os detalhes da sua loja</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="storeName" className="block text-sm font-medium mb-1">
                    Nome da loja
                  </label>
                  <Input
                    {...register("name")}
                    id="storeName"
                    placeholder="Digite o nome da sua loja"
                    className="w-full"
                  />
                  {errors.name && <span className="text-destructive text-[12px]">{errors.name.message}</span>}
                </div>

                <div>
                  <label htmlFor="storeDescription" className="block text-sm font-medium mb-1">
                    Descrição da loja
                  </label>
                  <Textarea
                    {...register("description")}
                    placeholder="Descreva sua loja em poucas palavras"
                    className="resize-none h-24"
                  />
                  {errors.description && (
                    <span className="text-destructive text-[12px]">{errors.description.message}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="storeURL" className="block text-sm font-medium mb-1">
                    URL da loja
                  </label>
                  <div className="w-full flex flex-col sm:flex-row">
                    <div className="hidden sm:flex h-10 items-center justify-center rounded-s-md border px-4 text-muted-foreground bg-muted">
                      https://
                    </div>
                    <div className="flex sm:hidden items-center mb-1 text-sm text-muted-foreground">
                      <span>https://</span>
                      <span className="ml-auto">.ploudstore.com</span>
                    </div>
                    <Input
                      {...register("subDomain")}
                      placeholder="sua-loja"
                      className="rounded-md sm:rounded-none sm:rounded-l-none"
                    />
                    <div className="hidden sm:flex h-10 items-center justify-center rounded-e-md border px-4 text-muted-foreground bg-muted">
                      .ploudstore.com
                    </div>
                  </div>
                  {errors.subDomain && <span className="text-destructive text-[12px]">{errors.subDomain.message}</span>}
                </div>

                <div>
                  <label htmlFor="currency" className="block text-sm font-medium mb-1">
                    Moeda da loja
                    <span className="text-[13px] text-muted-foreground ml-1">(Moeda que sua loja irá usar)</span>
                  </label>
                  <Select onValueChange={(value) => setValue("currency", value)} defaultValue="eur">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brl">Real (BRL)</SelectItem>
                      <SelectItem value="eur">Euro (EUR)</SelectItem>
                      <SelectItem value="usd">Dólar (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.currency && <span className="text-destructive text-[12px]">{errors.currency.message}</span>}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="button" onClick={goToNextStep} disabled={!isCurrentStepValid()} className="px-6">
                  Próximo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Passo 2: Escolha do Jogo */}
          {currentStep === 2 && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Escolha o Jogo</CardTitle>
                <CardDescription>Selecione o jogo para seu servidor</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                {errors.gameType && (
                  <span className="text-destructive text-[12px] block mb-4">{errors.gameType.message}</span>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <GameCardComponent
                    game="Minecraft"
                    selectedOption={selectGameId}
                    onChange={handleGameType}
                    iconPath="/games/Minecraft-Background.jpg"
                  />
                  <GameCardComponent
                    disabled={true}
                    selectedOption={selectGameId}
                    onChange={handleGameType}
                    game="FiveM"
                    iconPath="/games/FiveM-Background.webp"
                  />
                  <GameCardComponent
                    disabled={true}
                    selectedOption={selectGameId}
                    onChange={handleGameType}
                    game="RedDead"
                    iconPath="/games/RedDeadBackground.png"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                <Button type="button" variant="outline" onClick={goToPreviousStep} className="w-full sm:w-auto">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
                <Button
                  type="button"
                  onClick={goToNextStep}
                  disabled={!isCurrentStepValid()}
                  className="w-full sm:w-auto"
                >
                  Próximo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Passo 3: Escolha do Plano */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Escolha seu Plano</CardTitle>
                <CardDescription>Selecione o plano que melhor atende às suas necessidades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Plano Basic */}
                  <div
                    className={`border rounded-lg p-5 transition-all ${
                      selectedPlan === StorePlansEnum.basic
                        ? "border-violet-500 dark:border-violet-400 shadow-md ring-2 ring-violet-200 dark:ring-violet-800"
                        : "hover:border-violet-200 dark:hover:border-violet-800"
                    } cursor-pointer`}
                    onClick={() => handlePlanSelect(StorePlansEnum.basic)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Snowflake className="h-5 w-5 text-violet-500 dark:text-violet-400" />
                        <h3 className="font-bold text-lg text-violet-600 dark:text-violet-400">Basic</h3>
                      </div>
                      {selectedPlan === StorePlansEnum.basic && (
                        <Badge
                          variant="outline"
                          className="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800"
                        >
                          Selecionado
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold">0€</span>
                      <span className="text-sm text-muted-foreground ml-1">/para sempre</span>
                    </div>

                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                        <span>Até 5 produtos</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                        <span>Até 3 categorias</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                        <span>1 colaborador</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                        <span>Até 50€ em vendas mensais</span>
                      </li>
                    </ul>
                  </div>

                  {/* Plano Standard */}
                  <div
                    className={`border rounded-lg p-5 transition-all ${
                      selectedPlan === StorePlansEnum.standard
                        ? "border-violet-500 dark:border-violet-400 shadow-md ring-2 ring-violet-200 dark:ring-violet-800"
                        : "hover:border-violet-200 dark:hover:border-violet-800"
                    } cursor-pointer`}
                    onClick={() => handlePlanSelect(StorePlansEnum.standard)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-violet-500 dark:text-violet-400" />
                        <h3 className="font-bold text-lg text-violet-600 dark:text-violet-400">Standard</h3>
                      </div>
                      {selectedPlan === StorePlansEnum.standard && (
                        <Badge
                          variant="outline"
                          className="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800"
                        >
                          Selecionado
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold">3,99€</span>
                      <span className="text-sm text-muted-foreground ml-1">/por mês</span>
                    </div>

                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                        <span>Até 25 produtos</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                        <span>Até 15 categorias</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                        <span>3 colaboradores</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                        <span>Até 200€ em vendas mensais</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                        <span>Domínio próprio</span>
                      </li>
                    </ul>
                  </div>

                  {/* Plano Premium */}
                  <div
                    className={`border rounded-lg p-5 transition-all ${
                      selectedPlan === StorePlansEnum.premium
                        ? "border-violet-500 dark:border-violet-400 shadow-md ring-2 ring-violet-200 dark:ring-violet-800"
                        : "hover:border-violet-200 dark:hover:border-violet-800"
                    } cursor-pointer relative overflow-hidden`}
                    onClick={() => handlePlanSelect(StorePlansEnum.premium)}
                  >
                    <div className="absolute -right-10 -top-1 bg-violet-500 dark:bg-violet-600 text-white text-xs px-10 py-1 rotate-45">
                      <Star className="inline-block h-3 w-3 mr-1 text-yellow-300" />
                      Recomendado
                    </div>

                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-violet-500 dark:text-violet-400" />
                        <h3 className="font-bold text-lg text-violet-600 dark:text-violet-400">Premium</h3>
                      </div>
                      {selectedPlan === StorePlansEnum.premium && (
                        <Badge
                          variant="outline"
                          className="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800"
                        >
                          Selecionado
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold">9,99€</span>
                      <span className="text-sm text-muted-foreground ml-1">/por mês</span>
                    </div>

                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                        <span>Produtos ilimitados</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                        <span>Categorias ilimitadas</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                        <span>6 colaboradores</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                        <span>Vendas ilimitadas</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                        <span>Editor de templates</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                <Button type="button" variant="outline" onClick={goToPreviousStep} className="w-full sm:w-auto">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
                <Button
                  type="button"
                  onClick={goToNextStep}
                  disabled={!isCurrentStepValid()}
                  className="w-full sm:w-auto"
                >
                  Revisar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Passo 4: Revisão e Confirmação - Versão Melhorada com Suporte a Temas */}
          {currentStep === 4 && (
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 dark:from-violet-700 dark:to-purple-900 p-4 sm:p-6 text-white">
                <h2 className="text-xl sm:text-2xl font-bold">Quase lá!</h2>
                <p className="text-violet-100 mt-1 text-sm sm:text-base">
                  Revise os detalhes da sua loja antes de finalizar
                </p>
              </div>

              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:gap-8">
                  {/* Informações da Loja */}
                  <div className="rounded-xl border shadow-sm overflow-hidden">
                    <div className="bg-muted px-4 py-3 sm:px-6 sm:py-4 border-b flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Store className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold">Informações da Loja</h3>
                    </div>

                    <div className="p-4 sm:p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <div className="w-full sm:w-1/3">
                          <p className="text-sm font-medium text-muted-foreground">Nome da Loja</p>
                        </div>
                        <div className="w-full sm:w-2/3">
                          <p className="font-medium text-base sm:text-lg">{getValues("name")}</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                        <div className="w-full sm:w-1/3">
                          <p className="text-sm font-medium text-muted-foreground">Descrição</p>
                        </div>
                        <div className="w-full sm:w-2/3">
                          <p>{getValues("description")}</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <div className="w-full sm:w-1/3">
                          <p className="text-sm font-medium text-muted-foreground">URL da Loja</p>
                        </div>
                        <div className="w-full sm:w-2/3">
                          <div className="flex items-center flex-wrap">
                            <span className="text-primary">https://</span>
                            <span className="font-medium">{getValues("subDomain")}</span>
                            <span className="text-primary">.ploudstore.com</span>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <div className="w-full sm:w-1/3">
                          <p className="text-sm font-medium text-muted-foreground">Moeda</p>
                        </div>
                        <div className="w-full sm:w-2/3">
                          <Badge variant="outline" className="font-medium">
                            {getValues("currency") === "brl" && "Real (BRL)"}
                            {getValues("currency") === "eur" && "Euro (EUR)"}
                            {getValues("currency") === "usd" && "Dólar (USD)"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Jogo e Plano */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Jogo Selecionado */}
                    <div className="rounded-xl border shadow-sm overflow-hidden">
                      <div className="bg-muted px-4 py-3 sm:px-6 sm:py-4 border-b flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <Gamepad2 className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold">Jogo Selecionado</h3>
                      </div>

                      <div className="p-4 sm:p-6">
                        <div className="flex items-center justify-center">
                          {getValues("gameType") === "MINECRAFT" && (
                            <div className="text-center">
                              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-lg overflow-hidden border-4 border-primary/10 shadow-sm">
                                <img
                                  src="/games/Minecraft-Background.jpg"
                                  alt="Minecraft"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <h4 className="text-lg sm:text-xl font-bold text-primary">Minecraft</h4>
                              <p className="text-sm text-muted-foreground mt-1">Servidor de Minecraft</p>
                            </div>
                          )}
                          {getValues("gameType") === "FIVEM" && (
                            <div className="text-center">
                              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-lg overflow-hidden border-4 border-primary/10 shadow-sm">
                                <img
                                  src="/games/FiveM-Background.webp"
                                  alt="FiveM"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <h4 className="text-lg sm:text-xl font-bold text-primary">FiveM</h4>
                              <p className="text-sm text-muted-foreground mt-1">Servidor de FiveM</p>
                            </div>
                          )}
                          {getValues("gameType") === "REDDEAD" && (
                            <div className="text-center">
                              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-lg overflow-hidden border-4 border-primary/10 shadow-sm">
                                <img
                                  src="/games/RedDeadBackground.png"
                                  alt="Red Dead"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <h4 className="text-lg sm:text-xl font-bold text-primary">Red Dead</h4>
                              <p className="text-sm text-muted-foreground mt-1">Servidor de Red Dead</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Plano Selecionado */}
                    <div className="rounded-xl border shadow-sm overflow-hidden">
                      <div className="bg-muted px-4 py-3 sm:px-6 sm:py-4 border-b flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold">Plano Selecionado</h3>
                      </div>

                      <div className="p-4 sm:p-6">
                        {getValues("plan") === StorePlansEnum.basic && (
                          <div className="flex flex-col items-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                              <Snowflake className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                            </div>
                            <h4 className="text-lg sm:text-xl font-bold text-primary">Basic</h4>
                            <div className="flex items-baseline mt-1 mb-4">
                              <span className="text-xl sm:text-2xl font-bold">0€</span>
                              <span className="text-sm text-muted-foreground ml-1">/para sempre</span>
                            </div>
                            <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 mb-4">
                              Grátis
                            </Badge>
                            <ul className="space-y-2 text-sm w-full">
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                                <span>Até 5 produtos</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                                <span>Até 3 categorias</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                                <span>1 colaborador</span>
                              </li>
                            </ul>
                          </div>
                        )}

                        {getValues("plan") === StorePlansEnum.standard && (
                          <div className="flex flex-col items-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                              <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                            </div>
                            <h4 className="text-lg sm:text-xl font-bold text-primary">Standard</h4>
                            <div className="flex items-baseline mt-1 mb-4">
                              <span className="text-xl sm:text-2xl font-bold">3,99€</span>
                              <span className="text-sm text-muted-foreground ml-1">/por mês</span>
                            </div>
                            <Badge className="bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-800 mb-4">
                              Popular
                            </Badge>
                            <ul className="space-y-2 text-sm w-full">
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                                <span>Até 25 produtos</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                                <span>Até 15 categorias</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                                <span>3 colaboradores</span>
                              </li>
                            </ul>
                          </div>
                        )}

                        {getValues("plan") === StorePlansEnum.premium && (
                          <div className="flex flex-col items-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                              <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                            </div>
                            <h4 className="text-lg sm:text-xl font-bold text-primary">Premium</h4>
                            <div className="flex items-baseline mt-1 mb-4">
                              <span className="text-xl sm:text-2xl font-bold">9,99€</span>
                              <span className="text-sm text-muted-foreground ml-1">/por mês</span>
                            </div>
                            <Badge className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 mb-4">
                              <Star className="h-3 w-3 mr-1" /> Recomendado
                            </Badge>
                            <ul className="space-y-2 text-sm w-full">
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                                <span>Produtos ilimitados</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                                <span>Categorias ilimitadas</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                                <span>6 colaboradores</span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <div className="bg-muted/50 px-4 py-4 sm:px-6 sm:py-5 border-t">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <Button type="button" variant="outline" onClick={goToPreviousStep} className="w-full sm:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar e Editar
                  </Button>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <SubmitButton
                      isLoading={isPending}
                      enable={false}
                      text="Criar Minha Loja"
                      className="px-6 py-5 text-base font-medium w-full sm:w-auto"
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}
        </form>
      </div>
    </section>
  )
}
