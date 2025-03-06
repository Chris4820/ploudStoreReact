import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type BlogFormData, } from "../schema/newsSchema";
import { Input } from "../../../components/ui/input";
import { Switch } from "../../../components/ui/switch";
import EditorComponent from "../../../components/ui/editor/editor";
import BlogSchema from "../schema/newsSchema";
import SubmitButton from "../../../components/commons/buttons/SubmitButton";


type BlogFormProps = {
  initialData?: BlogFormData,
  onSubmit: (data: BlogFormData) => void,
  isSubmit: boolean,
  buttonText: string,
  children?: React.ReactNode
}


export default function BlogForm({initialData, onSubmit, buttonText, isSubmit, children} : BlogFormProps) {

  const { handleSubmit, register, formState: { errors, isDirty }, setValue, getValues } = useForm<BlogFormData>({
    resolver: zodResolver(BlogSchema),
    defaultValues: initialData || {
      title: '',
      author: '',
      content: '<p><br></p>',
      isVisible: true,
    },
    mode: 'onSubmit',
  });

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="p-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="col-span-2 space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
          <div className="space-y-1">
            <span className="font-semibold text-lg">Título da Notícia</span>
            <Input tabIndex={1} {...register("title")} placeholder="Digite o título da notícia" className="border rounded-md p-2"/>
            {errors.title && <span className='text-destructive text-[12px]'>{errors.title.message}</span>}
          </div>
          <div className="space-y-1">
              <span className="font-semibold text-lg">Autor</span>
              <Input tabIndex={2} {...register("author")} placeholder="Digite o nome do autor" className="border rounded-md p-2" />
              {errors.author && <span className='text-destructive text-[12px]'>{errors.author.message}</span>}
          </div>
        </div>
        <div>
          <span className="font-semibold text-lg">Conteúdo da Notícia</span>
          <EditorComponent 
            tabIndex={3}
            onEditorChange={(text) => setValue("content", text, {shouldDirty: true})}
            value={getValues("content")}
          />
          {errors.content && <span className='text-destructive text-[12px]'>{errors.content.message}</span>}
        </div>
      </div>
      <div className="col-span-1">
        <div className="p-5 border rounded-lg flex justify-between items-center shadow-sm">
          <div>
            <h1 className="font-semibold text-lg">Visibilidade da Notícia</h1>
            <p className="text-sm text-gray-600">Ative ou desative a visibilidade da notícia para os usuários.</p>
          </div>
          <Switch 
            defaultChecked={getValues("isVisible")}
            onCheckedChange={(checked) => setValue("isVisible", checked, {shouldDirty: true})} // Atualiza o valor de 'visible'
            className="accent-primary"
          />
        </div>
        {children}
      </div>
        
      </div>
      <div className="flex justify-end mt-5">
          <SubmitButton 
            isLoading={isSubmit}
            text={`${buttonText} notícia`}
            disabled={!isDirty}
            />
      </div>
    </form>
  )
}