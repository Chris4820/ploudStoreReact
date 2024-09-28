import { useFieldArray, useForm } from "react-hook-form";
import variableSchema, { type VariableFormData } from "../schema/VariablesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Trash2 } from "lucide-react";
import SubHeaderSection from "../../../components/commons/subHeader";
import CreateButtonComponent from "../../../components/commons/buttons/CreateButtonComponent";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Switch } from "../../../components/ui/switch";
import SubmitButton from "../../../components/commons/buttons/SubmitButtonComponent";
import { toast } from "sonner";




type VariableFormProps = {
  initialData?: VariableFormData;
  onSubmit: (data: VariableFormData) => void;
  isLoading: boolean,
  mode: 'edit' | 'create'
};


export default function CreateVariableForm({ initialData, isLoading, mode, onSubmit} : VariableFormProps) {

  const { handleSubmit, register, formState: { errors, isDirty }, getValues, setValue, control } = useForm<VariableFormData>({
    resolver: zodResolver(variableSchema),
    defaultValues: initialData || {
      slug: '',
      title: '',
      options: [
        {
          name: '',
          value: '',
          tax: 0,
          isDefault: false,
        },
        {
          name: '',
          value: '',
          tax: 0,
          isDefault: false,
        }
      ]
    },
    mode: 'onSubmit',
});

    function onSubmitAndCheck(data: VariableFormData) {
      //Verificar se tem apenas 1 default
      const defaultCount = data.options.filter(option => option.isDefault).length;

      // Se houver mais de um item padrão, exibe um erro e impede o envio
      if (defaultCount > 1) {
        toast.error("Apenas um item pode ser selecionado como padrão.");
        return; // Evita o envio do formulário
      }

      return onSubmit(data);
    }

    const {append, remove, fields} = useFieldArray({
      name: 'options',
      control
    });

    function removeOption(index: number) {
      if(fields.length > 2) {
          remove(index);
      }
    }

  return(
    <>
      <form onSubmit={handleSubmit(onSubmitAndCheck)}>
        <div className="grid grid-cols-3 gap-5 mt-5">
          <div>
            <label>Nome</label>
              <Input defaultValue={getValues("title")} className="mt-1" {...register("title")} placeholder="Ex: Escolha a cor"/>
              {errors.title && <span className='text-destructive text-[12px]'>{errors.title.message}</span>}
          </div>
          <div>
            <label>Slug</label>
              <Input className="mt-1" {...register("slug")} placeholder="{color}"/>
              {errors.slug && <span className='text-destructive text-[12px]'>{errors.slug.message}</span>}
          </div>

          </div>

          <div className="flex items-center justify-between mb-3 mt-5">
            <SubHeaderSection title="Variaveis" description="Mínimo de 2 variaveis"/>
            <CreateButtonComponent 
              type="button" 
              onClick={() => append({name: "", value: '', tax: 0})} 
              title="Variavel"
            />
          </div>
          
          <Table>
  <TableHeader>
    <TableRow className="hover:bg-transparent">
      <TableHead>Nome</TableHead>
      <TableHead>Valor</TableHead>
      <TableHead>
        <div className="grid grid-cols-2 gap-5 items-center">
          <p>Taxa</p>
          <p>Padrão</p>
        </div>
      </TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {fields.map((field, index) => (
      <TableRow key={field.id} className="hover:bg-transparent">
        <TableCell className="p-4 align-middle">
          <div className="flex flex-col">
            <Input
              placeholder="Ex: Amarelo"
              {...register(`options.${index}.name`)}
              className="flex-1 rounded-r-none"
            />
            {errors?.options?.[index]?.name && (
              <span className="text-destructive text-[12px]">
                {errors?.options?.[index]?.name?.message}
              </span>
            )}
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-col">
            <Input
              placeholder="Ex: yellow"
              {...register(`options.${index}.value`)}
              className="rounded-none"
            />
            {errors?.options?.[index]?.value && (
              <span className="text-destructive text-[12px]">
                {errors?.options?.[index]?.value?.message}
              </span>
            )}
          </div>
        </TableCell>
        <TableCell>
          <div className="grid grid-cols-2 gap-5 items-center">
            <div className="flex flex-col">
              <Input
                placeholder="Ex: 5"
                {...register(`options.${index}.tax`, { valueAsNumber: true })}
                className="rounded-none"
              />
              {errors?.options?.[index]?.tax && (
                <span className="text-destructive text-[12px]">
                  {errors?.options?.[index]?.tax?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
            <Switch
              defaultChecked={getValues(`options.${index}.isDefault`)} 
              onCheckedChange={(checked) => setValue(`options.${index}.isDefault`, checked)}/>
              {errors?.options?.[index]?.isDefault && (
                <span className="text-destructive text-[12px]">
                  {errors?.options?.[index]?.isDefault?.message}
                </span>
              )}
            </div>
            
          </div>
        </TableCell>
        <TableCell>
          <Button
            type="button"
            onClick={() => removeOption(index)}
            variant={"destructive"}
            size={"icon"}
            className="rounded-l-none"
          >
            <Trash2 className="cursor-pointer" size={20} />
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>


          <div className="flex justify-end">
            <SubmitButton isLoading={isLoading} text={mode === "create" ? 'Criar' : 'Editar'} enable={!isDirty}/>
          </div>
      </form>
    </>
  )
}