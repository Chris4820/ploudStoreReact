import HeaderSection from "../../../components/commons/Header";
import CustomDomainForm from "../components/DomainForm";
import { Button } from "../../../components/ui/button";
import { useUpdateCustomDomain } from "../mutation/ChangeCustomDomainMutation";
import { useGetStoreInformation } from "../../stores/api/store/store";
import LoadingComponent from "../../../containers/LoadingComponent";






export default function CustomDomainPage() {

  const { data: store , isLoading} = useGetStoreInformation();
  const { mutate: updateDomain, isPending} = useUpdateCustomDomain();



  if(isLoading) {
    return <LoadingComponent/>
}


  return(
    <>
      <HeaderSection 
        title="Domínio Customizado" 
        description="Use o seu domínio personalizado!"
        backLink="../"
      />

      <section className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        <div>
          <CustomDomainForm initialData={store} isPending={isPending} onSubmit={updateDomain}/>
        </div>
        <div className="flex justify-between items-center gap-5 border rounded-md shadow-md p-5">
          <div>
            <h1 className="font-semibold text-lg">Conexão</h1>
            <p className="text-muted-foreground">Teste aqui a conexão de seu dominio!</p>
          </div>
          <div className="flex justify-end">
            <Button>Verificar</Button>
          </div>
        </div>
      </section>
    </>
  )
}