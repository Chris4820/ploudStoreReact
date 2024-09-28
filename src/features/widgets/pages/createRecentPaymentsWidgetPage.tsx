import HeaderSection from "../../../components/commons/Header";
import LoadingComponent from "../../../containers/LoadingComponent";
import { useGetWidgetByType } from "../api/store/widgets";
import type { WidgetDefault } from "../api/req/widgets";
import { useUpdateWidget } from "../mutation/updateWigetMutation";
import type { RecentPaymentsWidgetFormData } from "../schema/RecentPaymentsSchema";
import RecentPaymentsForm from "../components/forms/RecentPaymentsForm";








export default function CreateWidgetRecentPayments() {



  const {data: widget, isLoading } = useGetWidgetByType("recentPayments");

  const { mutate: updateWidget, isPending} = useUpdateWidget("recentPayments");

  if(isLoading) {
    return <LoadingComponent/>
  }


  return(
    <>
      <HeaderSection backLink="../" title="Pagamentos recentes" description="Mostre em sua loja, os pagamentos recentes!"/>
      <RecentPaymentsForm isPending={isPending} onSubmit={(data) => updateWidget(data as WidgetDefault)} initialData={widget as RecentPaymentsWidgetFormData}/>
    </>
  )
}