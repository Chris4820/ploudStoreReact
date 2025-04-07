import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { Switch } from "../../../components/ui/switch";
import ProductSchema, { ProductFormData } from "../schema/ProductSchema";
import SubHeaderSection from "../../../components/commons/subHeader";
import CreateButtonComponent from "../../../components/commons/buttons/CreateButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { Trash2 } from "lucide-react";
import ImageUploadComponent from "../../../components/imageUploadComponent";
import CardSection from "../../../components/commons/CardSections";
import SubmitButton from "../../../components/commons/buttons/SubmitButton";
import PageEditor from "../../../components/ui/tiptap-Editor/Editortest";
import { DatePickerDemo } from "../../../components/ui/datapicker";
import { NumericFormat } from 'react-number-format';
import type { ServersProps } from "../../server/api/req/server";

type CategoryFormProps = {
  initialData?: ProductFormData,
  onSubmit: (data: ProductFormData) => void,
  servers: ServersProps[],
  isSubmit: boolean,
  children?: React.ReactNode
  onImageUpload: (file: File | null) => void,
  buttonText: string,
}

export default function ProductForm({ initialData, servers, buttonText, onSubmit, isSubmit, children, onImageUpload }: CategoryFormProps) {


    const { handleSubmit, register, formState: { errors, isDirty }, control, setValue, getValues, watch } = useForm<ProductFormData>({
        resolver: zodResolver(ProductSchema),
        defaultValues: initialData || {
          name: "",
          description: '<p><br></p>',
          visible: true,
          imageUrl: "",
          newImage: null,
          price: "", // Mudamos para string vazia em vez de 0
          oldPrice: "",
          stockEnable: false,
          stock: 0,
          expireEnable: false,
          quantityEnable: true,
          expireAt: null,
          ProductCommands: [
            { type: "PURCHASE", command: '', offline_execute: false }
          ]
        },
        mode: 'onSubmit',
    });

    console.log(errors);

    const {append, remove, fields} = useFieldArray({
        name: 'ProductCommands',
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
          setValue("hasChangeImage", true, {shouldDirty: true});
        }


    return(
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-6 lg:gap-5 mt-5">
            <div className="col-span-4 space-y-5">
                <div className="rounded-lg border p-4 shadow-md space-y-5">
                    <div>
                        <label>Nome</label>
                        <Input className="mt-1" {...register("name")}/>
                        {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                    </div>
                <div>
                    <label>Descrição</label>
                    <PageEditor
                        onChange={(text) => setValue("description", text, {shouldDirty: true})}
                        content={getValues("description")}
                    />
                    {errors.description && <span className='text-destructive text-[12px]'>{errors.description.message}</span>}
                </div>
                </div>

                <div className="border p-4 rounded-lg shadow-md">
                    <SubHeaderSection
                    title="Preços"
                    description="Gerencie o preço do produto"/>
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label>Preço</label>
                            <Controller
                                control={control}
                                name="price"
                                render={({ field: { onChange, value, ref } }) => (
                                    <NumericFormat
                                        getInputRef={ref}
                                        value={value}
                                        onValueChange={(values) => {
                                            onChange(values.value);
                                        }}
                                        decimalSeparator=","
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        allowNegative={false}
                                        thousandSeparator="."
                                        prefix="€ "
                                        allowLeadingZeros={false}
                                        customInput={Input}
                                        inputMode="decimal"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        type="text"
                                        id="price"
                                        maxLength={24}
                                        placeholder="0,00"
                                        className="mt-1"
                                    />
                                )}
                            />
                            {errors.price && <span className='text-destructive text-[12px]'>{errors.price.message}</span>}
                        </div>
                        <div>
                            <label>Preço Antigo</label>
                            <Controller
                                control={control}
                                name="oldPrice"
                                render={({ field: { onChange, value, ref } }) => (
                                    <NumericFormat
                                        getInputRef={ref}
                                        value={value}
                                        onValueChange={(values) => {
                                            onChange(values.value);
                                        }}
                                        decimalSeparator=","
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        allowNegative={false}
                                        thousandSeparator="."
                                        prefix="€ "
                                        allowLeadingZeros={false}
                                        customInput={Input}
                                        inputMode="decimal"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        type="text"
                                        id="price"
                                        maxLength={24}
                                        placeholder="0,00"
                                        className="mt-1"
                                    />
                                )}
                            />
                            {errors.oldPrice && <span className='text-destructive text-[12px]'>{errors.oldPrice.message}</span>}
                        </div>
                    </div>

                </div>

                <div className="border p-4 rounded-lg shadow-md">
                    <div className="flex justify-start items-center gap-5">
                    <SubHeaderSection
                    title="Stock"
                    description="Gerencie o stock do produto"/>

                    <Switch
                        defaultChecked={getValues("stockEnable")}
                        onCheckedChange={(checked) => setValue("stockEnable", checked, {shouldDirty: true})} // Atualiza o valor de 'visible'
                        className="accent-primary"
                    />
                    </div>
                    {watch('stockEnable') && (
                        <div>
                            <label>Stock</label>
                            <Input id="stock" className="mt-1" {...register("stock")}/>
                            {errors.stock && <span className='text-destructive text-[12px]'>{errors.stock.message}</span>}
                        </div>
                    )}
                </div>

                <div className="border p-4 rounded-lg shadow-md">
                    <div className="flex justify-start items-center gap-5">
                    <SubHeaderSection
                    title="Produto temporário"
                    description="Gerencie o tempo do produto"/>

                    <Switch
                        defaultChecked={getValues("expireEnable")}
                        onCheckedChange={(checked) => setValue("expireEnable", checked, {shouldDirty: true})} // Atualiza o valor de 'visible'
                        className="accent-primary"
                    />
                    </div>
                    {watch('expireEnable') && (
                        <div>
                            <label>Data de expiração</label>
                            <DatePickerDemo buttonDisable initialDate={getValues('expireAt') || null} 
                            onChange={(value) => setValue("expireAt", value)}/>
                            {errors.expireAt && <span className='text-destructive text-[12px]'>{errors.expireAt.message}</span>}
                        </div>
                    )}
                </div>
                
                
                <div className="mt-5 border p-4 rounded-lg shadow-md"> {/* Ajuste no mb para uma margem inferior mais controlada */}
    <div className="flex items-center justify-between mb-3">
        <SubHeaderSection title="Comandos" description="Mínimo de 1 comando"/>
        <CreateButtonComponent 
            type="button" 
            onClick={() => append({type: "PURCHASE", command: '', offline_execute: false, server: {id: -1, name: ""}})} 
            title="Comando"
        />
    </div>
    <section className="border rounded-lg p-5 space-y-4"> {/* Ajuste em space-y para um espaço mais controlado */}
        {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-4 items-center h-12">
                    <Select
                        defaultValue={getValues(`ProductCommands.${index}.type`) || "PURCHASE"}
                        {...register(`ProductCommands.${index}.type`)}
                        onValueChange={(value: "EXPIRE" | "PURCHASE") => setValue(`ProductCommands.${index}.type`, value)}
                    >
                        <SelectTrigger className="col-span-1 rounded-r-none">
                            <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="PURCHASE">Na compra</SelectItem>
                            <SelectItem value="EXPIRE">Na expiração</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        {...register(`ProductCommands.${index}.server.id`)}
                        defaultValue={getValues(`ProductCommands.${index}.server.id`)?.toString()}
                        onValueChange={(value: string) => setValue(`ProductCommands.${index}.server.id`, Number(value))}
                    >
                        <SelectTrigger className="col-span-1 rounded-none">
                            <SelectValue placeholder="Selecione um servidor" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={"-1"}>Selecione um servidor</SelectItem>
                            {servers.map((server) => (
                                <SelectItem key={server.id} value={server.id.toString()}>
                                    {server.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                <div className="col-span-2 flex items-center">
                    <Input {...register(`ProductCommands.${index}.command`)} className="flex-1 rounded-l-none" /> {/* O Input agora ocupa o espaço restante */}
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
                {errors?.ProductCommands?.[index]?.command && <span className='text-destructive text-[12px]'>{errors.ProductCommands?.[index]?.command?.message}</span>}
                {errors?.ProductCommands?.[index]?.server?.id && <span className='text-destructive text-[12px]'>{errors.ProductCommands?.[index]?.server?.id?.message}</span>}
            </div>
        ))}
    </section>
</div>

                
            </div>

            <div className="col-span-2 space-y-5">
                <div className="lg:mt-0 mt-5">
                    <CardSection 
                        title="Imagem do produto" 
                        hAuto>
                        <ImageUploadComponent imageUrl={getValues("imageUrl")} MAX_SIZE_IMAGE={1} onImageChange={(image) => ChangeImage(image)}/>
                    </CardSection>
                </div>
                <div className="p-5 border rounded-lg flex justify-between items-center shadow-md">
                    <div>
                        <h1 className="font-semibold text-lg">Desativar produto</h1>
                        <p>Ative a visibilidade do produto</p>
                    </div>
                    <Switch
                        defaultChecked={getValues("visible")}
                        onCheckedChange={(checked) => setValue("visible", checked, {shouldDirty: true})} // Atualiza o valor de 'visible'
                        className="accent-primary"
                    />
                </div>

                <div className="p-5 border rounded-lg flex justify-between items-center shadow-md">
                    <div>
                        <h1 className="font-semibold text-lg">Aumentar quantidade</h1>
                        <p>Permitir aumentar quantidade no carrinho</p>
                    </div>
                    <Switch
                        defaultChecked={getValues("quantityEnable")}
                        onCheckedChange={(checked) => setValue("quantityEnable", checked, {shouldDirty: true})} // Atualiza o valor de 'visible'
                        className="accent-primary"
                    />
                </div>

                {children && children}
                
                <div className="mt-5 flex justify-end">
                <SubmitButton
                    isLoading={isSubmit}
                    text={`${buttonText} produto`}
                    enable={!isDirty}
                />
                </div>
            </div>
            
        </form>
    )
}