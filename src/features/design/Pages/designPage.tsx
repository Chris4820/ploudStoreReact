import DesignForm from "../components/DesignForm";
import { useUpdateDesign } from "../mutation/UpdateDesignMutation";


export default function DesignPage() {


  const { mutate: updateDesign } = useUpdateDesign();

  return(
    <DesignForm isLoading={false} onSubmit={(data) => updateDesign(data)}/>
  )

}
  