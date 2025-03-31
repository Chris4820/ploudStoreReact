import HeaderSection from "../../../components/commons/Header";
import { useGetCustomPage } from "../api/store";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../containers/LoadingComponent";
import NotFoundComponent from "../../../containers/404Component";
import CustomPageForm from "../components/CustomPageForm";
import { useUpdateCustomPage } from "../mutation/edit";




export default function EditCustomPage() {


  const { id } = useParams<{ id: string }>();



  const {data: customPage, isLoading} = useGetCustomPage(id as string);

  console.log(customPage);

  const { mutate: updateCustomPage, isPending } = useUpdateCustomPage(id as string);

  if(isLoading) {
      return <LoadingComponent/>
    }
  
  if(!customPage) {
    return <NotFoundComponent
              title="Página nao encontrada"
              description="Essa página nao foi encontrada!"/>
  }

  



  return(
    <>
      <HeaderSection
      title="Editar página"
      description="Edite sua página customizada"
      backLink="../"/>


      <CustomPageForm
          initialData={customPage}
          isSubmit={isPending}
          onSubmit={updateCustomPage}
          buttonText="Editar"
          />
    </>
  )
}