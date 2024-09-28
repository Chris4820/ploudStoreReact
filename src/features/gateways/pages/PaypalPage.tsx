import { useGetGateway } from "../api/store/gateway";
import HeaderSection from "../../../components/commons/Header";
import LoadingComponent from "../../../containers/LoadingComponent";
import { useUpdateGateway } from "../mutation/UpdateGateway";
import PayPalForm from "../components/PayPalForm";
import type { PaypalFormData } from "../schema/PayPalSchema";






export default function PaypalPage() {


  const {data: gateway, isLoading } = useGetGateway("paypal");
  const {mutate: updateGateway, isPending} = useUpdateGateway("paypal");

    if(isLoading) {
      return <LoadingComponent/>
    }


  return(
    <>
    <HeaderSection backLink="../" title="Paypal" description="Configure e aceite PayPal em sua loja!"/>
    <PayPalForm initialData={gateway as PaypalFormData} isLoading={isPending} onSubmit={(data) => updateGateway(data)}/>
      
    </>
  )
}