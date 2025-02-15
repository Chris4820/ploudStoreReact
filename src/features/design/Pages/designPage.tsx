import LoadingComponent from "../../../containers/LoadingComponent";
import DesignForm from "../components/DesignForm";
import NotFoundComponent from "../../../containers/404Component";
import { useGetDesign } from "../api/store";
import { useUpdateDesign } from "../mutation/UpdateDesignMutation";



export default function DesignPage() {

  const { data: design, isLoading} = useGetDesign();

  const { mutate: updateDesign } = useUpdateDesign();


  if(isLoading) {
    return <LoadingComponent/>
  }

  if(!design) {
    return <NotFoundComponent title="Design" description="Algo correu errado!"/>
  }

  return(
    <DesignForm isLoading={false} 
                onSubmit={(data) => updateDesign(data)}
                initialData={design}/>
  )

}
  