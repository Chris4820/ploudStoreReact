import DesignForm from "../components/DesignForm";
import { useUpdateDesign } from "../mutation/UpdateDesignMutation";
import { useStore } from "../../../provider/Store/StoreContext";



export default function DesignPage() {

  const store = useStore();

  const { mutate: updateDesign } = useUpdateDesign();

  return(
    <DesignForm isLoading={false} 
        onSubmit={(data) => updateDesign(data)}
        initialData={
          {
            primaryColor: store.primaryColor,
            secondaryColor: store.secondaryColor,
          }
        }/>
  )

}
  