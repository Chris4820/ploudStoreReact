import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { CustomPageFormData } from "../schema/customPages";
import CustomPageSchema from "../schema/customPages";
import { Switch } from "../../../components/ui/switch";
import SubHeaderSection from "../../../components/commons/subHeader";
import PageEditor from "../../../components/ui/tiptap-Editor/Editortest";
import { Input } from "../../../components/ui/input";
import SubmitButton from "../../../components/commons/buttons/SubmitButton";

type CustomPageFormProps = {
  initialData?: CustomPageFormData,
  onSubmit: (data: CustomPageFormData) => void,
  isSubmit: boolean,
  children?: React.ReactNode
  buttonText: string,
}



export default function CustomPageForm(props : CustomPageFormProps) {

  const { handleSubmit, register, formState: { errors }, getValues, setValue } = useForm<CustomPageFormData>({
      resolver: zodResolver(CustomPageSchema),
      defaultValues: props.initialData || {
        title: '',
        content: '',
        slug: '',
        menuName: '',
        isShowMenu: true,
        isActive: true,
        includeCategories: true,
        includeModules: true,
      },
      mode: 'onSubmit',
  });


  return(

    <form onSubmit={handleSubmit(props.onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-5 grid-cols-1">
          <div>
            <span>Titulo</span>
            <Input {...register("title")} placeholder="Page News"/>
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <span>Slug</span>
            <Input {...register("slug")} placeholder="Ex: news"/>
            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
          </div>
          <div>
            <span>Menu</span>
            <Input {...register("menuName")} placeholder="Ex: News"/>
            {errors.menuName && <p className="text-red-500 text-sm mt-1">{errors.menuName.message}</p>}
          </div>
        </div>

      <div className="mt-5">
        <PageEditor 
          content={getValues("content")} 
          onChange={(value: string) => setValue("content", value, { shouldValidate: true })} />

        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
      </div>

    <div className="mt-5">
      <SubHeaderSection
      title="Opções"
      description="Mude as opções da página"/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg flex justify-between items-center shadow-md">
          <div>
            <h1 className="font-semibold text-lg">Visibilidade</h1>
            <p>Altere a visibilidade da página</p>
          </div>
          <Switch
            defaultChecked={getValues("isActive")}
            onCheckedChange={(checked) => setValue("isActive", checked)} // Atualiza o valor de 'visible'
            className="accent-primary"/>
        </div>
        <div className="p-5 border rounded-lg flex justify-between items-center shadow-md">
          <div>
            <h1 className="font-semibold text-lg">Categorias</h1>
            <p>Incluir categorias</p>
          </div>
          <Switch
            defaultChecked={getValues("includeCategories")}
            onCheckedChange={(checked) => setValue("includeCategories", checked)} // Atualiza o valor de 'visible'
            className="accent-primary"/>
        </div>
        <div className="p-5 border rounded-lg flex justify-between items-center shadow-md">
          <div>
            <h1 className="font-semibold text-lg">Widgets</h1>
            <p>Incluir Widgets</p>
          </div>
          <Switch
            defaultChecked={getValues("includeModules")}
            onCheckedChange={(checked) => setValue("includeModules", checked)} // Atualiza o valor de 'visible'
            className="accent-primary"/>
        </div>
        <div className="p-5 border rounded-lg flex justify-between items-center shadow-md">
          <div>
            <h1 className="font-semibold text-lg">Menu</h1>
            <p>Incluir no menu</p>
          </div>
          <Switch
            defaultChecked={getValues("isShowMenu")}
            onCheckedChange={(checked) => setValue("isShowMenu", checked)} // Atualiza o valor de 'visible'
            className="accent-primary"/>
        </div>
      </div>
      <div className="flex mt-5 justify-end">
        <SubmitButton
        className="max-w-[200px]"
        isLoading={props.isSubmit}
        enable={false}
        text="Criar página"/>
      </div>
      </div>
      </form>

  )
}