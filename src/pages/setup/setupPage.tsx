import { useState } from "react";
import { CgAdd, CgSpinner } from "react-icons/cg";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { IoIosAddCircleOutline, IoMdArrowRoundBack } from "react-icons/io";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createStore } from "../../api/req/store";
import { Textarea } from "../../components/ui/textarea";


export default function SetupPage() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [selectGameId, setSelectGameId] = useState("MINECRAFT");

    const handleGameType = (gameType: string) => {
        if(gameType === "MINECRAFT" || gameType === "FIVEM" || gameType === "REDDEAD") {
            setSelectGameId(gameType);
            setValue('gameType', gameType);
        }
        
      }; 
    

    const { mutate: createNewStore, isPending } = useMutation({
        mutationFn: createStore,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['stores'] });
            navigate('/');
            toast(data?.data.message);
        },
    });

    async function showSelect(value: string) {
        setValue("current", value);
    }

    const createStoreSchema = z.object({
        name: z.string().min(1, "O nome é obrigatório"),
        description: z.string().min(10, 'Descrição com pelo menos 10 letras'),
        subDomain: z.string().min(3, "Insira pelo menos 3 caracteres")
                .regex(/^[a-zA-Z0-9-_]+$/, "O subdomínio deve conter apenas letras, números, hífens e sublinhados"),
        current: z.string().default('eur'),
        gameType: z.enum(['MINECRAFT', 'FIVEM', 'REDDEAD']).default("MINECRAFT"),
    })
    type storeCreateFormData = z.infer<typeof createStoreSchema>
    const { handleSubmit, register, formState: { errors }, setValue} = useForm<storeCreateFormData>({
        resolver: zodResolver(createStoreSchema),
    })

    async function sendStoreCreate(data: storeCreateFormData) {
        createNewStore(data);
    }

    function CardSuggestGame() {
        const discordInviteLink = "https://discord.gg/Ntd2g4e6V6"; //Convite para sala de new-games
        return(
            <div className="relative rounded-xl h-40 border-dashed border-2 border-primary overflow-hidden focus:outline-none">
                <a href={discordInviteLink} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex justify-center items-center text-center text-muted-foreground hover:text-purple-600 cursor-pointer">
                  <div className="flex gap-2">
                    <CgAdd size={26} />
                    <p className="font-semibold text-lg">Sugerir Game</p>
                  </div>
                </a>
              </div>
        )
      }

      type CardGameProps = {
        name: string,
        iconPath: string,
      }
      function CardGame({name, iconPath} : CardGameProps) {
        return(
            <button
                key={name}
                type="button"
                className={`relative group h-40 max-w-[300px] min-w-[270px] rounded-xl border ${selectGameId === name.toUpperCase() && 'ring ring-purple-600/80'} bg-gray-200 overflow-hidden focus:outline-none`}
                onClick={() => handleGameType(name.toUpperCase())}
                >
                <div className="relative w-full h-full overflow-hidden">
                    <img className="w-full h-full" src={iconPath} alt={name}/>
                    <div className="absolute group-hover:flex hidden inset-0 bg-black opacity-70 transition-opacity duration-300"></div>
                </div>
                <p className="absolute inset-0 group-hover:flex hidden text-balance items-center justify-center w-full h-full mx-auto mt-2 px-1 text-sm font-medium transition-opacity duration-300 text-white">
                    {name}
                </p>
            </button>
        )
      }

  return (
    <section className="container flex justify-center items-center min-h-screen">
        <div>
        <Button className="gap-1 items-center text-base" onClick={() => navigate('/')} variant={"link"}>
            <IoMdArrowRoundBack className="mt-[2px]" size={18}/>
            Voltar
            </Button>
        <form
        onSubmit={handleSubmit(sendStoreCreate)} 
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
                        <Textarea className="resize-none"/>
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
                        <Select onValueChange={showSelect} defaultValue="eur">
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
                    <div className="p-5 max-h-[400px] overflow-y-auto">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center items-center">
                            <CardGame name="Minecraft" iconPath="/games/Minecraft-Background.jpg"/>
                            <CardGame name="FiveM" iconPath="/games/FiveM-Background.webp"/>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                            <CardGame name="RedDead" iconPath="/games/RedDeadBackground.png"/>
                            <CardSuggestGame/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end items-center">
                <Button className="mt-3">
                    {isPending ? (
                        <CgSpinner className="animate-spin"/>
                    ): (
                        <div className="flex items-center gap-1 "> 
                            <IoIosAddCircleOutline className="mt-[2px]" size={20}/>
                            Criar loja
                        </div>
                        )}
                     </Button>
                    
                    
            </div>
            
        </form>
        </div>
    </section>
  );
}
