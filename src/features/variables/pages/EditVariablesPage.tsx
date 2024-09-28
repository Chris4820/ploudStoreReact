import { useParams } from "react-router-dom";
import CreateVariableForm from "../components/CreateVariablesForm";
import { useGetVariable } from "../api/store/VariablesStore";
import HeaderSection from "../../../components/commons/Header";
import LoadingComponent from "../../../containers/LoadingComponent";
import { useUpdateVariable } from "../mutation/EditVariableMutation";




export default function EditVariablesPage() {

  const { variableId } = useParams();

  const {data: variable, isLoading} = useGetVariable(Number(variableId))

  const { mutate: updateVariable, isPending } = useUpdateVariable(Number(variableId));


  if(isLoading) {
    return <LoadingComponent/>
  }

  return(
    <>
      <HeaderSection title="Editar variavel" description="Atualize a variavel" backLink="../variable"/>
      <CreateVariableForm mode="edit" initialData={variable} isLoading={isPending} onSubmit={updateVariable}/>
    </>
    
  )
}