import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import EditorComponent from "../../../components/ui/editor/editor";
import { Switch } from "../../../components/ui/switch";
import ProductSchema, { ProductFormData } from "../schema/ProductSchema";
import SubHeaderSection from "../../../components/commons/subHeader";
import CreateButtonComponent from "../../../components/commons/buttons/CreateButtonComponent";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { Trash2 } from "lucide-react";
import ImageUploadComponent from "../../../components/imageUploadComponent";
import CardSection from "../../../components/commons/CardSections";
import { isDirty } from "zod";
import SubmitButton from "../../../components/commons/buttons/SubmitButton";




type CategoryFormProps = {
  initialData?: ProductFormData,
  onSubmit: (data: ProductFormData) => void,
  isSubmit: boolean,
  children?: React.ReactNode
  onImageUpload: (file: File | null) => void,
  buttonText: string,
}

export default function ProductForm({ initialData, buttonText, onSubmit, isSubmit, children, onImageUpload }: CategoryFormProps) {

    const { handleSubmit, register, formState: { errors }, control, setValue, getValues } = useForm<ProductFormData>({
        resolver: zodResolver(ProductSchema),
        defaultValues: initialData || {
          name: "",
          description: '<p><br></p>',
          visible: true,
          imageUrl: "",
          newImage: null,
          price: 0,
          stock: 0,
          expire_days: 0,
          commands: [
            { type: "PURCHASE", command: '', offline_execute: false }
          ] // Comando default adicionado
        },
        mode: 'onSubmit',
    });


    const {append, remove, fields} = useFieldArray({
        name: 'commands',
        control
    });

    function removeOption(index: number) {
        if(fields.length > 1) {
            remove(index);
        }
    }

    function ChangeImage(image: File | null) {
        if (image) {
            const { size, type } = image;
            const fileMetadata = { type, size }; // Crie um objeto com os metadados do arquivo
            setValue("newImage", fileMetadata); // Define como um array com os metadados do arquivo
            onImageUpload(image);
          } else {
            setValue("newImage", null); // Remove a URL da imagem se nenhuma imagem estiver selecionada
          }
          setValue("hasChangeImage", true);
        }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-6 gap-5">
            <div className="col-span-4 space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div>
                        <label>Nome</label>
                        <Input className="mt-1" {...register("name")}/>
                        {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                    </div>
                    <div>
                        <label>Preço</label>
                        <Input id="price" className="mt-1" {...register("price")}/>
                        {errors.price && <span className='text-destructive text-[12px]'>{errors.price.message}</span>}
                    </div>
                </div>
                <div>
                    <label>Descrição</label>
                    <EditorComponent
                        onEditorChange={(text) => setValue("description", text, {shouldDirty: true})}
                        value={getValues("description")}
                    />
                    {errors.description && <span className='text-destructive text-[12px]'>{errors.description.message}</span>}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div>
                        <label>Stock (0 para ilimitado)</label>
                        <Input id="stock" className="mt-1" type="number" {...register("stock")}/>
                        {errors.stock && <span className='text-destructive text-[12px]'>{errors.stock.message}</span>}
                    </div>
                    <div>
                        <label>Expirar em: (0 para ilimitado)</label>
                        <Input className="mt-1" type="number" {...register("expire_days")}/>
                        {errors.expire_days && <span className='text-destructive text-[12px]'>{errors.expire_days.message}</span>}
                    </div>
                </div>
                
                <div className="mt-5"> {/* Ajuste no mb para uma margem inferior mais controlada */}
    <div className="flex items-center justify-between mb-3">
        <SubHeaderSection title="Comandos" description="Mínimo de 1 comando"/>
        <CreateButtonComponent 
            type="button" 
            onClick={() => append({type: "PURCHASE", command: '', offline_execute: false})} 
            title="Comando"
        />
    </div>
    <section className="border rounded-lg p-5 space-y-4"> {/* Ajuste em space-y para um espaço mais controlado */}
        {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-3 items-center h-12">
                    <Select
                        defaultValue={getValues(`commands.${index}.type`) || "PURCHASE"}
                        {...register(`commands.${index}.type`)}
                        onValueChange={(value: "EXPIRE" | "PURCHASE") => setValue(`commands.${index}.type`, value)}
                    >
                        <SelectTrigger className="col-span-1 rounded-r-none"> {/* Ajuste de borda para a esquerda */}
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="PURCHASE">Na compra</SelectItem>
                            <SelectItem value="EXPIRE">Na expiração</SelectItem>
                        </SelectContent>
                    </Select>
                <div className="col-span-2 flex items-center">
                    <Input {...register(`commands.${index}.command`)} className="flex-1 rounded-l-none" /> {/* O Input agora ocupa o espaço restante */}
                    <Button 
                        type="button" 
                        onClick={() => removeOption(index)} 
                        variant={"destructive"} 
                        size={"icon"} 
                        className="ml-2 rounded-l-none" // Ajuste na margem
                    >
                        <Trash2 className="cursor-pointer" size={20}/>
                    </Button>
                </div>
                {errors?.commands?.[index]?.command && <span className='text-destructive text-[12px]'>{errors.commands[index]?.command?.message}</span>}
            </div>
        ))}
    </section>
</div>

                
            </div>

            <div className="col-span-2 space-y-5">
                <div className="mt-5">
                    <CardSection 
                        title="Imagem do produto" 
                        hAuto>
                        <ImageUploadComponent imageUrl={getValues("imageUrl")} MAX_SIZE_IMAGE={1} onImageChange={(image) => ChangeImage(image)}/>
                    </CardSection>
                </div>
                <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold text-lg">Desativar produto</h1>
                        <p>Ative a visibilidade do produto</p>
                    </div>
                    <Switch
                        defaultChecked={getValues("visible")}
                        onCheckedChange={(checked) => setValue("visible", checked)} // Atualiza o valor de 'visible'
                        className="accent-primary"
                    />
                </div>

                {children && children}
                
                <div className="mt-5 flex justify-end">
                <SubmitButton
                    isPending={isSubmit}
                    text={`${buttonText} produto`}
                    isDisable={!isDirty}
                />
                </div>
            </div>
            
        </form>
    )
}