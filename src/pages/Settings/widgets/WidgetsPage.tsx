import { IoSettingsOutline } from "react-icons/io5";
import { LuGoal } from "react-icons/lu";
import { GiMoneyStack } from "react-icons/gi";
import { MdHistory } from "react-icons/md";
import { BsDiscord } from "react-icons/bs";
import { RiMedal2Fill } from "react-icons/ri";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Switch } from "../../../components/ui/switch";
import { Input } from "../../../components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { useGetStoreWidgets } from "../../../api/store/store";




export default function WidgetsPage() {
    const {data: widgets, isLoading} = useGetStoreWidgets();

    if(isLoading) return (<h1>Carregando</h1>)

    return(
        <>
        <h1 className="font-semibold text-lg">Widgets</h1>
        <p className="text-muted-foreground mt-1">Crie ou personalize aqui os seus Widgets</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="border rounded-lg p-5 mt-5 col-span-2">
                <div className="flex gap-2 justify-start items-center">
                    <LuGoal size={24} className="text-purple-600"/>
                    <p className="font-semibold">Metas de comunidade</p>
                </div>
                <p className="text-muted-foreground mt-1">Crie metas de comunidade para aumentar as vendas!</p>
                <h1 className="font-semibold mt-3">Meta ativa:</h1>
                <div className="flex justify-between mt-2 border rounded-lg p-2 text-muted-foreground">
                   <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Purchase</TableHead>
                                <TableHead>Percente Complete</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            
                                <TableRow>
                                    <TableCell className="text-start font-medium">MetaTeste</TableCell>
                                    <TableCell>1000€</TableCell>
                                    <TableCell>12€</TableCell>
                                    <TableCell>8%</TableCell>
                                    <TableCell className="text-yellow-500">Processing</TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild className="w-full">
                                            <TableCell><IoSettingsOutline className="cursor-pointer" size={24}/></TableCell>
                                        </DialogTrigger>
                                        <DialogContent className="">
                                        <DialogHeader>
                                        <DialogTitle>Edit Goal</DialogTitle>
                                        <DialogDescription>
                                            Edite a sua meta da melhor maneira!
                                        </DialogDescription>
                                        </DialogHeader>
                            </DialogContent>
                                    </Dialog>
                                </TableRow>
                        </TableBody>
                   </Table>
                    
                </div>
                
                <div className="flex justify-end mt-4 gap-5">
                    <Button variant={"outline"}>Histórico</Button>
                    <Button>Criar meta</Button>
                </div>
            </div>
            <div className="border rounded-lg p-5 mt-5 h-[300px] lg:h-auto relative col-span-2 lg:col-span-1">
                <div className="flex gap-2 justify-start items-center">
                    <GiMoneyStack size={24} className="text-purple-600"/>
                    <p className="font-semibold">Top Compradores</p>
                </div>
                <p className="text-muted-foreground mt-1">Exiba pessoas que mais compraram em sua loja</p>
                <div className="mt-5 space-y-5">
                    <div className="flex items-center space-x-2">
                        <Switch defaultChecked={widgets?.bestClientShow} id="airplane-mode" />
                        <span>Exibir Top Compradores</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch defaultChecked={widgets?.bestClientShowValue} id="airplane-mode" />
                        <span>Exibir valor da doação</span>
                    </div>
                </div>
                <div className="absolute bottom-5 right-5 mt-5">
                    <Button>Atualizar</Button>
                </div>
            </div>
        </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="border rounded-lg p-5 relative mt-5 h-[300px]">
                <div className="flex gap-2 justify-start items-center">
                    <MdHistory size={24} className="text-purple-600"/>
                    <p className="font-semibold">Últimas compras</p>
                </div>
                <p className="text-muted-foreground mt-1">Exiba as últimas compras efetuadas em sua loja</p>
                <div className="mt-5 space-y-5">
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" defaultChecked={widgets?.lastPurchaseShow}/>
                        <span>Exibir Últimas compras</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" defaultChecked={widgets?.lastPurchaseShowValue}/>
                        <span>Exibir valor da doação</span>
                    </div>
                </div>
                <div className="absolute bottom-5 right-5 mt-5">
                    <Button>Atualizar</Button>
                </div>
            </div>

            <div className="border rounded-lg p-5 mt-5 h-[300px] relative">
                <div className="flex gap-2 justify-start items-center">
                    <BsDiscord size={24} className="text-purple-600"/>
                    <p className="font-semibold">Discord</p>
                </div>
                <p className="text-muted-foreground mt-1">Exiba o seu discord em sua loja e facilite a entrada de novos membros</p>
                <div className="mt-5 space-y-5">
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" defaultChecked={widgets?.showDiscord}/>
                        <span>Exibir Discord</span>
                    </div>
                    <Input placeholder="DiscordID" defaultValue={widgets?.discordId}/>
                </div>
                <div className="absolute bottom-5 right-5 mt-5">
                    <Button>Atualizar</Button>
                </div>
            </div>

            <div className="border rounded-lg p-5 mt-5 h-[300px] relative">
                <div className="flex gap-2 justify-start items-center">
                    <RiMedal2Fill size={24} className="text-purple-600"/>
                    <p className="font-semibold">Produto em destaque</p>
                </div>
                <p className="text-muted-foreground mt-1">Exiba um produto em destaque em sua loja</p>
                <div className="mt-5 space-y-5">
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <span>Exibir Produto em destaque</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <span>Exibir valor da doação</span>
                    </div>
                </div>
                <div className="absolute bottom-5 right-5 mt-5">
                    <Button>Atualizar</Button>
                </div>
            </div>

            </div>

            

        </>
    )
}