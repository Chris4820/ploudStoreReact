import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/commons/buttons/SubmitButton";
import { Input } from "../../../components/ui/input";
import CategorySchema, { CategoryFormData } from "../schema/CategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { Textarea } from "../../../components/ui/textarea";
import React, { useEffect, useMemo, useState } from "react";
import { Switch } from "../../../components/ui/switch";
import { useStore } from "../../../provider/Store/StoreContext";



type CategoryFormProps = {
  initialData?: CategoryFormData,
  onSubmit: (data: CategoryFormData) => void,
  mode: 'create' | 'edit',
  isLoading: boolean,
  children?: React.ReactNode
}


export default function CategoryForm({ initialData, onSubmit, mode, isLoading, children }: CategoryFormProps) {

  const [searchParams] = useSearchParams();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const store = useStore();



  const { handleSubmit, register, formState: { errors }, getValues, setValue, watch } = useForm<CategoryFormData>({
    resolver: zodResolver(CategorySchema),
    defaultValues: initialData || {
      id: undefined,
      name: "",
      description: "",
      slug: "",
      visible: true,
      parentId: parseInt(searchParams.get("parent") as string) || undefined,
    },
    mode: 'onSubmit',
  });

  console.log(errors);


  useEffect(() => {
    if (mode === 'edit') {
      const subscription = watch((values) => {
        const isChanged = JSON.stringify(initialData) !== JSON.stringify(values);
        setIsFormChanged(isChanged);
      });
  
      return () => subscription.unsubscribe();
    }
  }, [initialData, watch, mode]);


  console.log(getValues());

  return(
    <form 
        className="grid grid-cols-1 lg:grid-cols-5 gap-5"
        onSubmit={handleSubmit(onSubmit)}>
            <div className="col-span-3 space-y-5">
                <div>
                    <label>Nome</label>
                    <Input id="name" {...register("name")} className="mt-1"/>
                    {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                </div>
                <div>
                    <label>Descrição</label>
                    <Textarea {...register("description")} id="description" className="mt-1 h-32 resize-none"/>
                    {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                </div>
                <div>
                    <label>Slug</label>
                    <div className="flex mt-1">
                        <div className="h-10 border px-5 bg-muted rounded-l-md flex items-center">
                            <h1>{store?.activeDomain}/</h1>
                        </div>
                        <Input
                        {...register("slug")}
                        id={"slug"}
                        className="rounded-l-none"  
                        placeholder="URL bonito para esta categoria (apenas letras, números e travessões)"/>
                    </div>
                    {errors.slug && <span className='text-destructive text-[12px]'>{errors.slug.message}</span>}
                </div>
            </div>
            <div className="col-span-2 space-y-5">
                <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold text-lg">Visibilidade</h1>
                        <p>Altere a visibilidade da categoria</p>
                    </div>
                    <Switch
                        defaultChecked={getValues("visible")}
                        onCheckedChange={(checked) => setValue("visible", checked)} // Atualiza o valor de 'visible'
                        className="accent-primary"
                    />
                </div>
                
                {children && children}
                
                <div className="mt-5 flex justify-end">
                {useMemo(() => {
                  return <SubmitButton isLoading={isLoading} text="Guardar alterações" enable={mode === "edit" && !isFormChanged} />;
                }, [isLoading, isFormChanged, mode])}
                
            </div>
            </div>
        </form>
  )
}