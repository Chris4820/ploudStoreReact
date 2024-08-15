import { useSearchParams } from "react-router-dom";
import { useGetHistoryGoals } from "../../../../api/store/store/goal";
import HeaderSection from "../../../../components/commons/Header";
import { DataTable } from "../../../../components/ui/datatable";
import { columnsGoals } from "../discount/GoalColumns";





export default function HistoryGoalPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const {data: goals, isLoading} = useGetHistoryGoals(page);


  return(
    <>
    <HeaderSection title="Histórico de metas" description="Veja todas as suas metas já criadas!"/>
    <DataTable columns={columnsGoals} data={goals?.goals || []} loading={isLoading} meta={goals?.meta}/>
    </>
  )
}