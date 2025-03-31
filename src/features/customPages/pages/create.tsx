import HeaderSection from "../../../components/commons/Header";
import { useCreateCustomPage } from "../mutation/create";
import CustomPageForm from "../components/CustomPageForm";




export default function CreateCustomPage() {


  const {mutate: createCustomPage, isPending} = useCreateCustomPage();

  return(
    <>
      <HeaderSection
      title="Criar página"
      description="Crie sua página customizada"
      backLink="../"/>

    <CustomPageForm
      isSubmit={isPending}
      onSubmit={createCustomPage}
      buttonText="Criar"
      />
    </>
  )
}