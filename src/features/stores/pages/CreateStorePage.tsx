import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { type createStoreProps } from "../../../api/req/store";
import { Textarea } from "../../../components/ui/textarea";
import createStoreSchema, { type CreateStoreFormData } from "../schema/createStoreSchema";
import { useCreateStore } from "../mutations/createStoreMutation";
import SubmitButton from "../../../components/commons/buttons/SubmitButtonComponent";
import GameCardComponent from "../components/gameCardComponent";


export default function CreateStorePage() {

    const navigate = useNavigate();
    const [selectGameId, setSelectGameId] = useState("MINECRAFT");

    const handleGameType = (gameType: string) => {
        if(gameType === "MINECRAFT" || gameType === "FIVEM" || gameType === "REDDEAD") {
            setSelectGameId(gameType);
            setValue('gameType', gameType);
        }
        
      }; 


    const { handleSubmit, register, formState: { errors }, setValue} = useForm<CreateStoreFormData>({
        resolver: zodResolver(createStoreSchema),
        defaultValues: {
            gameType: "MINECRAFT",
            current: 'eur',
        }
    })

    const { mutate: createStore, isPending} = useCreateStore();

    async function onSubmitCreateStore(data: createStoreProps) {
        createStore(data);
    }

  return (
    <section className="container flex justify-center items-center min-h-screen">
        <div>
        <Button className="gap-1 items-center text-base" onClick={() => navigate('/')} variant={"link"}>
            <IoMdArrowRoundBack className="mt-[2px]" size={18}/>
            Voltar
            </Button>
        <form
        onSubmit={handleSubmit(onSubmitCreateStore)} 
        className="p-5 border rounded-lg w-full h-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div className="w-full h-full">
                    <h2 className="text-xl font-bold mb-4">Insira informações sobre sua loja</h2>
                    <div className="space-y-4">
                    <div>
                        <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">Nome da loja</label>
                        <Input {...register("name")} id="storeName" className="mt-1" placeholder="Digite o nome da sua loja" />
                        {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-700">Descrição da loja</label>
                        <Textarea {...register("description")} className="resize-none"/>
                        {errors.description && <span className='text-destructive text-[12px]'>{errors.description.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="storeURL" className="block text-sm font-medium text-gray-700">URL da loja</label>
                        <div className="w-full flex mt-1">
                            <div className="hidden sm:flex h-10 items-center justify-center rounded-s-md border px-4 text-muted-foreground bg-muted">https://</div>
                            <Input {...register("subDomain")} className="rounded-none"/>
                            <div className="hidden sm:flex h-10 items-center justify-center rounded-e-md border px-4 text-muted-foreground bg-muted">.ploudstore.com</div>
                        </div>
                        {errors.subDomain && <span className='text-destructive text-[12px]'>{errors.subDomain.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="storeURL" className="mb-1 block text-sm font-medium text-gray-700">Moeda da loja 
                        <span className="text-[13px] text-muted-foreground"> (Moeda que sua loja irá usar)</span></label>
                        <Select onValueChange={(value) => setValue("current", value)} defaultValue="eur">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent defaultChecked>
                            <SelectItem onSelect={() => console.log("Ola")} value="brl">Real (BRL)</SelectItem>
                            <SelectItem value="eur">Euro (EUR)</SelectItem>
                            <SelectItem value="usd">Dólar (USD)</SelectItem>
                        </SelectContent>
                        </Select>
                        {errors.current && <span className='text-destructive text-[12px]'>{errors.current.message}</span>}
                    </div>
                    </div>
                </div>

                <div className="h-full w-full">
                    <h2 className="text-xl font-bold mb-4">Escolha o jogo para seu servidor</h2>
                    {errors.gameType && <span className='text-destructive text-[12px]'>{errors.gameType.message}</span>}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
                    <GameCardComponent
                        game="Minecraft" 
                        selectedOption={selectGameId} 
                        onChange={handleGameType} 
                        iconPath="/games/Minecraft-Background.jpg" 
                    />
                    <GameCardComponent
                        selectedOption={selectGameId} 
                        onChange={handleGameType} 
                        game="FiveM"
                        iconPath="/games/FiveM-Background.webp" 
                    />
                    <GameCardComponent
                        selectedOption={selectGameId} 
                        onChange={handleGameType} 
                        game="RedDead"
                        iconPath="/games/RedDeadBackground.png" 
                    />
                    </div>
                </div>
            </div>

            <div className="flex justify-end items-center">
                <SubmitButton isLoading={isPending} text="Criar loja"/>
            </div>
            
        </form>
        </div>
    </section>
  );
}
