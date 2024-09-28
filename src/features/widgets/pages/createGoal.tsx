import HeaderSection from "../../../components/commons/Header";
import GoalWidgetForm from "../components/forms/GoalForm";
import type { GoalWidgetFormData } from "../schema/GoalSchema";
import LoadingComponent from "../../../containers/LoadingComponent";
import { useGetWidgetByType } from "../api/store/widgets";
import { useUpdateWidget } from "../mutation/updateWigetMutation";
import type { WidgetDefault } from "../api/req/widgets";








export default function CreateWidgetGoal() {

  const {data: widget, isLoading } = useGetWidgetByType("goal");

  const { mutate: updateGoalWidget, isPending} = useUpdateWidget("goal");

  if(isLoading) {
    return <LoadingComponent/>
  }


  return(
    <>
      <HeaderSection backLink="../" title="Atualize a Meta" description="Atualize o widget de meta em sua loja!"/>
      <GoalWidgetForm isPending={isPending} onSubmit={(data) => updateGoalWidget(data as WidgetDefault)} initialData={widget as GoalWidgetFormData}/>
    </>
  )
}