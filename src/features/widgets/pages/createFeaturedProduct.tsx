import { useGetWidgetByType } from "../api/store/widgets";
import HeaderSection from "../../../components/commons/Header";
import LoadingComponent from "../../../containers/LoadingComponent";
import FeaturedProductForm from "../components/forms/featuredProductForm";
import type { FeaturedProductWidgetFormData } from "../schema/FeaturedProductSchema";
import { useUpdateWidget } from "../mutation/updateWigetMutation";
import type { WidgetDefault } from "../api/req/widgets";








export default function CreateFeaturedProduct() {

  const {data: widget, isLoading} = useGetWidgetByType("featuredProduct");


  const {mutate: updateFeaturedProduct, isPending} = useUpdateWidget("featuredProduct");


  if(isLoading) {
    return <LoadingComponent/>
  }

  return(
    <>
      <HeaderSection backLink="../" title="Produto em destaque" description="Mostre em sua loja um produto destacado, aumentando assim a chance de compra"/>
      <FeaturedProductForm isPending={isPending} onSubmit={(data) => updateFeaturedProduct(data as WidgetDefault)} initialData={widget as FeaturedProductWidgetFormData}/>
    </>
  )
}