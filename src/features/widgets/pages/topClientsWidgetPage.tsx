import HeaderSection from "../../../components/commons/Header";
import LoadingComponent from "../../../containers/LoadingComponent";
import { useGetWidgetByType } from "../api/store/widgets";
import TopClientsForm from "../components/forms/TopClientsForm";
import type { TopClientsWidgetFormData } from "../schema/TopClientsSchema";
import { useUpdateWidget } from "../mutation/updateWigetMutation";
import type { WidgetDefault } from "../api/req/widgets";



export default function CreateWidgetTopCostumersPage() {



  const {data: widget, isLoading } = useGetWidgetByType("topCustomers");

  const { mutate: updateWidget, isPending} = useUpdateWidget("topCustomers");

  if(isLoading) {
    return <LoadingComponent/>
  }

  return(
    <>
      <HeaderSection backLink="../" title="Pódio de Clientes" description="Mostre em sua loja os melhores doadores!"/>
      <TopClientsForm isPending={isPending} onSubmit={(data) => updateWidget(data as WidgetDefault)} initialData={widget as TopClientsWidgetFormData}/>
    </>
  )
}