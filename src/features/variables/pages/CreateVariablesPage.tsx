import HeaderSection from "../../../components/commons/Header";
import CreateVariableForm from "../components/CreateVariablesForm";
import { useCreateVariable } from "../mutation/CreateVariableMutation";




export default function CreateVariablesPage() {

  const { mutate: createVariable, isPending} = useCreateVariable();
  return(
    <>
      <HeaderSection title="Criar variavel" description="Crie sua variavel" backLink="../variable"/>
      <CreateVariableForm mode="create" isLoading={isPending} onSubmit={(data) => createVariable(data)}/>
    </>
  )
}