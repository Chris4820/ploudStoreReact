import HeaderSection from "../../../components/commons/Header";
import LoadingComponent from "../../../containers/LoadingComponent";
import { useUpdateGateway } from "../mutation/UpdateGateway";
import { useGetGateway } from "../api/store/gateway";
import PagSeguroForm from "../components/PagSeguroForm";
import type { PagSeguroFormData } from "../schema/PagSeguroSchema";


export default function PagSeguroPage() {

  const {data: gateway, isLoading } = useGetGateway("pagseguro");
  const {mutate: updateGateway, isPending} = useUpdateGateway("pagseguro");

    if(isLoading) {
      return <LoadingComponent/>
    }


  return(
    <>
    <HeaderSection backLink="../" title="PagSeguro" description="Configure e aceite pagseguro em sua loja!"/>
    <PagSeguroForm initialData={gateway as PagSeguroFormData} isLoading={isPending} onSubmit={(data) => updateGateway(data)}/>
    </>
  )
}