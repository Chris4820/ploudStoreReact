import HeaderSection from "../../../components/commons/Header";
import LoadingComponent from "../../../containers/LoadingComponent";
import { useUpdateGateway } from "../mutation/UpdateGateway";
import { useGetGateway } from "../api/store/gateway";
import type { MollieFormData } from "../schema/MollieSchema";
import MollieForm from "../components/MollieForm";


export default function MolliePage() {

  const {data: gateway, isLoading } = useGetGateway("mollie");
  const {mutate: updateGateway, isPending} = useUpdateGateway("mollie");

    if(isLoading) {
      return <LoadingComponent/>
    }


  return(
    <>
    <HeaderSection backLink="../checkout" title="Mollie" description="Configure e aceite Mollie em sua loja!"/>
    <MollieForm initialData={gateway as MollieFormData} isLoading={isPending} onSubmit={(data) => updateGateway(data)}/>
    </>
  )
}