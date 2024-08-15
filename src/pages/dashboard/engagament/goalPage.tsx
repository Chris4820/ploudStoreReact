import { LuGoal } from "react-icons/lu";
import HeaderSection from "../../../components/commons/Header";
import CardEmptyComponent from "../../../components/commons/CardEmpty";
import { MdOutlineAddCircle } from "react-icons/md";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/datatable";
import { columnsGoals } from "./discount/GoalColumns";
import { useGetHistoryGoals } from "../../../api/store/store/goal";
import CardSection from "../../../components/commons/CardSections";
import ProgressCircle from "../../../components/circleProgress";



export default function GoalPage() {

    const {data: goals, isLoading: goalsLoading} = useGetHistoryGoals(1);
    return(
        <>
        <div className="flex justify-between items-center">
            <HeaderSection title="Metas" description="Crie novas metas para sua loja!"/>
            <Button className="gap-1 items-center">
                <MdOutlineAddCircle className="mt-[1px]" size={18}/>
                Meta
            </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            <div className="border rounded-lg p-5 h-auto w-auto">
                <div className="flex gap-2 justify-start items-center">
                    <LuGoal size={24} className="text-purple-600"/>
                    <p className="font-semibold">Metas de comunidade</p>
                </div>
                <div className="mt-3">
                    <CardEmptyComponent title="Sem metas" description="Parece que não existe nenhuma meta ativa!"/>
                </div>
            </div>

            <CardSection title="Histórico de metas" link="history" hAuto>
                <DataTable columns={columnsGoals} data={goals?.goals || []} loading={goalsLoading}/>
            </CardSection>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mt-5">
            <CardSection title="Taxa de sucesso" help="Percentagem de metas finalizadas com sucesso">
                <ProgressCircle percent={20}/>
            </CardSection>
        </div>
        
        </>
    )
}