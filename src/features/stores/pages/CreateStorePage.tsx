"use client"

import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { ArrowLeft, Check, Sparkles, Zap, Snowflake, Star } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../../../components/ui/textarea";
import createStoreSchema, { StorePlansEnum, type CreateStoreFormData } from "../schema/createStoreSchema";
import { useCreateStore } from "../mutations/createStoreMutation";
import SubmitButton from "../../../components/commons/buttons/SubmitButton";
import GameCardComponent from "../components/gameCardComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";

export default function CreateStorePage() {
    const navigate = useNavigate();
    const [selectGameId, setSelectGameId] = useState("MINECRAFT");
    const [selectedPlan, setSelectedPlan] = useState<StorePlansEnum>(StorePlansEnum.basic);

    const handleGameType = (gameType: string) => {
        if(gameType === "MINECRAFT" || gameType === "FIVEM" || gameType === "REDDEAD") {
            setSelectGameId(gameType);
            setValue('gameType', gameType);
        }
    }; 

    const handlePlanSelect = (plan: StorePlansEnum) => {
        setSelectedPlan(plan);
        setValue('plan', plan);
    };

    const { handleSubmit, register, formState: { errors }, setValue} = useForm<CreateStoreFormData>({
        resolver: zodResolver(createStoreSchema),
        defaultValues: {
            gameType: "MINECRAFT",
            currency: 'eur',
            plan: StorePlansEnum.basic,
        }
    })

    const { mutate: createStore, isPending} = useCreateStore();

    async function onSubmitCreateStore(data: CreateStoreFormData) {
        createStore(data);
    }

    return (
        <section className="container py-8 space-y-8">
            <div className="flex items-center">
                <Button 
                    className="gap-1 items-center text-base" 
                    onClick={() => navigate('/')} 
                    variant={"link"}
                >
                    <ArrowLeft className="mt-[2px]" size={18}/>
                    Voltar
                </Button>
            </div>

            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-2">Crie sua loja de jogos</h1>
                <p className="text-muted-foreground text-center mb-8">Configure sua loja personalizada e comece a vender em minutos</p>
                
                <form onSubmit={handleSubmit(onSubmitCreateStore)} className="space-y-8">
                    <Tabs defaultValue="info" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-8">
                            <TabsTrigger value="info">Informações da Loja</TabsTrigger>
                            <TabsTrigger value="game">Tipo de Jogo</TabsTrigger>
                            <TabsTrigger value="plan">Plano de Assinatura</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="info" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informações Básicas</CardTitle>
                                    <CardDescription>Preencha os detalhes da sua loja</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label htmlFor="storeName" className="block text-sm font-medium mb-1">Nome da loja</label>
                                        <Input 
                                            {...register("name")} 
                                            id="storeName" 
                                            placeholder="Digite o nome da sua loja" 
                                            className="w-full"
                                        />
                                        {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="storeDescription" className="block text-sm font-medium mb-1">Descrição da loja</label>
                                        <Textarea 
                                            {...register("description")} 
                                            placeholder="Descreva sua loja em poucas palavras"
                                            className="resize-none h-24"
                                        />
                                        {errors.description && <span className='text-destructive text-[12px]'>{errors.description.message}</span>}
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="storeURL" className="block text-sm font-medium mb-1">URL da loja</label>
                                        <div className="w-full flex">
                                            <div className="hidden sm:flex h-10 items-center justify-center rounded-s-md border px-4 text-muted-foreground bg-muted">https://</div>
                                            <Input 
                                                {...register("subDomain")} 
                                                placeholder="sua-loja"
                                                className="rounded-none"
                                            />
                                            <div className="hidden sm:flex h-10 items-center justify-center rounded-e-md border px-4 text-muted-foreground bg-muted">.ploudstore.com</div>
                                        </div>
                                        {errors.subDomain && <span className='text-destructive text-[12px]'>{errors.subDomain.message}</span>}
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="currency" className="block text-sm font-medium mb-1">
                                            Moeda da loja 
                                            <span className="text-[13px] text-muted-foreground ml-1">(Moeda que sua loja irá usar)</span>
                                        </label>
                                        <Select onValueChange={(value) => setValue("currency", value)} defaultValue="eur">
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="brl">Real (BRL)</SelectItem>
                                                <SelectItem value="eur">Euro (EUR)</SelectItem>
                                                <SelectItem value="usd">Dólar (USD)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.currency && <span className='text-destructive text-[12px]'>{errors.currency.message}</span>}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        
                        <TabsContent value="game">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Escolha o Jogo</CardTitle>
                                    <CardDescription>Selecione o jogo para seu servidor</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {errors.gameType && <span className='text-destructive text-[12px] block mb-4'>{errors.gameType.message}</span>}
                                    
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
                            </Card>
                        </TabsContent>
                        
                        <TabsContent value="plan">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Escolha seu Plano</CardTitle>
                                    <CardDescription>Selecione o plano que melhor atende às suas necessidades</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Plano Basic */}
                                        <div 
                                            className={`border rounded-lg p-5 transition-all ${
                                                selectedPlan === "basic" 
                                                ? "border-violet-500 shadow-md ring-2 ring-violet-200" 
                                                : "hover:border-violet-200"
                                            } cursor-pointer`}
                                            onClick={() => handlePlanSelect(StorePlansEnum.basic)}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Snowflake className="h-5 w-5 text-violet-500" />
                                                    <h3 className="font-bold text-lg text-violet-600">Basic</h3>
                                                </div>
                                                {selectedPlan === "basic" && (
                                                    <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
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
                                                    <Check className="h-4 w-4 text-green-500" />
                                                    <span>Até 5 produtos</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="h-4 w-4 text-green-500" />
                                                    <span>Até 3 categorias</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="h-4 w-4 text-green-500" />
                                                    <span>1 colaborador</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="h-4 w-4 text-green-500" />
                                                    <span>Até 50€ em vendas mensais</span>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        {/* Plano Standard */}
                                        <div 
                                            className={`border rounded-lg p-5 transition-all ${
                                                selectedPlan === "standard" 
                                                ? "border-violet-500 shadow-md ring-2 ring-violet-200" 
                                                : "hover:border-violet-200"
                                            } cursor-pointer`}
                                            onClick={() => handlePlanSelect(StorePlansEnum.standard)}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Zap className="h-5 w-5 text-violet-500" />
                                                    <h3 className="font-bold text-lg text-violet-600">Standard</h3>
                                                </div>
                                                {selectedPlan === "standard" && (
                                                    <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
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
                                                    <Check className="h-4 w-4 text-green-500" />
                                                    <span>Até 25 produtos</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="h-4 w-4 text-green-500" />
                                                    <span>Até 15 categorias</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="h-4 w-4 text-green-500" />
                                                    <span>3 colaboradores</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="h-4 w-4 text-green-500" />
                                                    <span>Até 200€ em vendas mensais</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="h-4 w-4 text-green-500" />
                                                    <span>Domínio próprio</span>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        {/* Plano Premium */}
                                        <div 
                                            className={`border rounded-lg p-5 transition-all ${
                                                selectedPlan === "premium" 
                                                ? "border-violet-500 shadow-md ring-2 ring-violet-200" 
                                                : "hover:border-violet-200"
                                            } cursor-pointer relative overflow-hidden`}
                                            onClick={() => handlePlanSelect(StorePlansEnum.premium)}
                                        >
                                            <div className="absolute -right-10 -top-1 bg-violet-500 text-white text-xs px-10 py-1 rotate-45">
                                                <Star className="text-yellow-400"/>
                                            </div>
                                            
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Sparkles className="h-5 w-5 text-violet-500" />
                                                    <h3 className="font-bold text-lg text-violet-600">Premium</h3>
                                                </div>
                                                {selectedPlan === "premium" && (
                                                    <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
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
                                                    <Check className="h-4 w-4 text-green-500" />
                                                    <span>Produtos ilimitados</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="h-4 w-4 text-green-500" />
                                                    <span>Categorias ilimitadas</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="h-4 w-4 text-green-500" />
                                                    <span>6 colaboradores</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="h-4 w-4 text-green-500" />
                                                    <span>Vendas ilimitadas</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="h-4 w-4 text-green-500" />
                                                    <span>Editor de templates</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                    
                    <div className="flex justify-end">
                        <SubmitButton 
                            isLoading={isPending} 
                            enable={false} 
                            text="Criar loja"
                            className="px-8"
                        />
                    </div>
                </form>
            </div>
        </section>
    );
}
