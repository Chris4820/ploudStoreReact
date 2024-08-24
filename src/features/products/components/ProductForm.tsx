import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ImageUpload from "../../../components/imageUploadTest";
import { Input } from "../../../components/ui/input";
import EditorComponent from "../../../components/ui/editor";
import HeaderSection from "../../../components/commons/Header";
import { Switch } from "../../../components/ui/switch";
import SubmitButton from "../../../components/commons/buttons/SubmitButtonComponent";
import ProductSchema, { ProductFormData } from "../schema/ProductSchema";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";




type CategoryFormProps = {
  initialData?: ProductFormData,
  onSubmit: (data: ProductFormData) => void,
  mode: 'create' | 'edit',
  isLoading: boolean,
  children?: React.ReactNode
}



export default function ProductForm({ initialData, onSubmit, mode, isLoading, children }: CategoryFormProps) {

    const [searchParams] = useSearchParams();
    const [isFormChanged, setIsFormChanged] = useState(false);

    const { handleSubmit, register, formState: { errors }, setValue, watch } = useForm<ProductFormData>({
        resolver: zodResolver(ProductSchema),
        defaultValues: initialData || {
          id: undefined,
          name: "",
          description: "",
          categoryId: parseInt(searchParams.get("parent") as string) || undefined,
          visible: true,
          imageUrl: "",
          price: 0,
        },
        mode: 'onSubmit',
    });


    useEffect(() => {
      if (mode === 'edit') {
        const subscription = watch((values) => {
          const isChanged = JSON.stringify(initialData) !== JSON.stringify(values);
          setIsFormChanged(isChanged);
        });
    
        return () => subscription.unsubscribe();
      }
    }, [initialData, watch]);

    return(
        <>
        <HeaderSection title="Editar produto"/>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className="col-span-3 space-y-5">
                <div>
                    <label>Nome</label>
                    <Input className="mt-1" {...register("name")}/>
                    {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                </div>
                <div>
                    <label>Descrição</label>
                    <EditorComponent {...register("description")}
                      value="ola"
                      onEditorChange={(content) => setValue('description', content)}
                    />
                    {errors.description && <span className='text-destructive text-[12px]'>{errors.description.message}</span>}
                </div>
                <div>
                    <label>Preço</label>
                    <Input className="mt-1" type="number" {...register("price")}/>
                    {errors.price && <span className='text-destructive text-[12px]'>{errors.price.message}</span>}
                </div>
            </div>
            <div className="col-span-2 space-y-5">
                <div className="mt-5">
                    <ImageUpload id="productId" MAX_SIZE_IMAGE={5} {...register("imageUrl")} onImageChange={() => console.log("Mudou")}/>
                </div>
                <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold text-lg">Desativar produto</h1>
                        <p>Ative a visibilidade do produto</p>
                    </div>
                    <Switch defaultChecked={true} id="enable-product" />
                </div>
                <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold text-lg">Quantidade</h1>
                        <p>Ative a quantidade do produto</p>
                    </div>
                    <Switch defaultChecked={true} id="enable-quantity" />
                </div>

                {children && children}

            </div>
            <div className="mt-5 flex justify-end">
            {useMemo(() => {
                  return <SubmitButton isLoading={isLoading} text="Guardar alterações" enable={mode === "edit" && !isFormChanged} />;
                }, [isLoading, isFormChanged])}
            </div>
        </form>
        
        </>
    )
}