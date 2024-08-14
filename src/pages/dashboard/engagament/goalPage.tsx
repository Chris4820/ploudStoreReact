import { LuGoal } from "react-icons/lu";
import HeaderSection from "../../../components/commons/Header";
import CardEmptyComponent from "../../../components/commons/CardEmpty";
import { MdHistory, MdOutlineAddCircle } from "react-icons/md";
import { Button } from "../../../components/ui/button";



export default function GoalPage() {
    return(
        <>
        <div className="flex justify-between items-center">
            <HeaderSection title="Metas" description="Crie novas metas para sua loja!"/>
            <Button className="gap-1 items-center">
                <MdOutlineAddCircle className="mt-[1px]" size={18}/>
                Meta
            </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="col-span-2">
            <div className="border rounded-lg p-5 h-auto w-auto">
                <div className="flex gap-2 justify-start items-center">
                    <LuGoal size={24} className="text-purple-600"/>
                    <p className="font-semibold">Metas de comunidade</p>
                </div>
                <div className="mt-3">
                    <CardEmptyComponent title="Sem metas" description="Parece que não existe nenhuma meta ativa!"/>
                </div>
            </div>
            </div>

            <div className="col-span-1 border rounded-lg p-5">
                <div className="flex gap-2 justify-start items-center">
                    <MdHistory size={24} className="text-purple-600"/>
                    <p className="font-semibold">Histórico de metas</p>
                </div>
                <div className="mt-5">
                    <ul className="space-y-3">
                        <li className="flex border-b pb-1 justify-between text-base">
                            <h1 className="font-semibold">Abertura</h1>
                            <p>100%</p>
                            <p className="bg-green-600 rounded-md py-0.5 text-white px-2 text-sm">Concluido</p>
                        </li>
                        <li className="flex border-b pb-1 justify-between text-base">
                            <h1 className="font-semibold">Abertura</h1>
                            <p>100%</p>
                            <p className="bg-green-600 rounded-md py-0.5 text-white px-2 text-sm">Concluido</p>
                        </li>
                        <li className="flex border-b pb-1 justify-between text-base">
                            <h1 className="font-semibold">Abertura</h1>
                            <p>76,9%</p>
                            <p className="bg-yellow-600 rounded-md py-0.5 text-white px-2 text-sm">Incompleto</p>
                        </li>
                        <li className="flex border-b pb-1 justify-between text-base">
                            <h1 className="font-semibold">Abertura</h1>
                            <p>100%</p>
                            <p className="bg-red-600 rounded-md py-0.5 text-white px-2 text-sm">Cancelado</p>
                        </li>
                        <li className="flex border-b pb-1 justify-between text-base">
                            <h1 className="font-semibold">Abertura</h1>
                            <p>100%</p>
                            <p className="bg-green-600 rounded-md py-0.5 text-white px-2 text-sm">Concluido</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}