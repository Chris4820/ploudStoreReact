import { useGetGateway } from "../api/store/gateway";
import HeaderSection from "../../../components/commons/Header";
import LoadingComponent from "../../../containers/LoadingComponent";
import StripeForm from "../components/StripeForm";
import { useUpdateGateway } from "../mutation/UpdateGateway";
import type { StripeFormData } from "../schema/StripeSchema";






export default function StripePage() {

  const {data: gateway, isLoading } = useGetGateway("stripe");
  const {mutate: updateGateway, isPending} = useUpdateGateway("stripe");


    if(isLoading) {
      return <LoadingComponent/>
    }

  return(
    <>
    <HeaderSection backLink="../checkout" title="Stripe" description="Configure e aceite Stripe em sua loja!"/>
    <StripeForm initialData={gateway as StripeFormData} isLoading={isPending} onSubmit={(data) => updateGateway(data)}/>
      
    </>
  )
}