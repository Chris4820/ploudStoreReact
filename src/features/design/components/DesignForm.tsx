import { zodResolver } from "@hookform/resolvers/zod";
import designSchema, { type designFormData } from "../Schema/designSchema";
import { useForm } from "react-hook-form";
import HeaderSection from "../../../components/commons/Header";
import ColorPickerComponent from "../../../components/colorPickerComponent";
import SubmitButton from "../../../components/commons/buttons/SubmitButtonComponent";
import SubHeaderSection from "../../../components/commons/subHeader";
import { Switch } from "../../../components/ui/switch";



type DesignFormProps = {
  initialData?: designFormData;
  onSubmit: (data: designFormData) => void;
  isLoading: boolean,
};


export default function DesignForm({initialData, onSubmit} : DesignFormProps) {

const { handleSubmit, formState: { isDirty }, getValues, setValue } = useForm<designFormData>({
  resolver: zodResolver(designSchema),
  defaultValues: initialData,
  mode: 'onSubmit',
});

return(
  <>
    <HeaderSection title="Design" description="Mude o design de sua loja aqui!"/>

    <form onSubmit={handleSubmit(onSubmit)}>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ColorPickerComponent 
            color={getValues("primaryColor")} 
            onColorChange={(color) => setValue("primaryColor", color, {shouldDirty: true})}
            title="Cor principal da loja"/>

        <ColorPickerComponent 
            color={getValues("secondaryColor")} 
            onColorChange={(color) => setValue("secondaryColor", color, {shouldDirty: true})}
            title="Cor secundária da loja"/>
    </div>

    <div>
      <SubHeaderSection
        title="Configurações design"
        description="Mude as configurações iniciais de sua loja"/>

      <div className="grid grid-cols-3 gap-5">
        <div className="flex gap-5 items-center">
          <span>Tema escuro padrão</span>
          <Switch/>
        </div>

      </div>
    </div>

    <div className="mt-5 flex justify-end">
      <SubmitButton text="Atualizar" isLoading={false} enable={!isDirty}/>
    </div>

    </form>
  </>
)
}