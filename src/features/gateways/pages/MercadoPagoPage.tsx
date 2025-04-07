import HeaderSection from "../../../components/commons/Header";
import LoadingComponent from "../../../containers/LoadingComponent";
import { useUpdateGateway } from "../mutation/UpdateGateway";
import { useGetGateway } from "../api/store/gateway";
import MercadoPagoForm from "../components/MercadoPagoForm";
import type { MercadoPagoFormData } from "../schema/MercadoPagoSchema";


export default function MercadoPagoPage() {

  const {data: gateway, isLoading } = useGetGateway("mercadopago");
  const {mutate: updateGateway, isPending} = useUpdateGateway("mercadopago");

    if(isLoading) {
      return <LoadingComponent/>
    }


  return(
    <>
    <HeaderSection backLink="../checkout" title="Mercado pago" description="Configure e aceite Mercado pago em sua loja!"/>
    <MercadoPagoForm initialData={gateway as MercadoPagoFormData} isLoading={isPending} onSubmit={(data) => updateGateway(data)}/>
      
    </>
  )
}