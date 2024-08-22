import { useParams } from "react-router-dom";
import { Input } from "../../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import createProductSchema, { type CreateProductFormData } from "../schema/CreateProductSchema";
import { useForm } from "react-hook-form";
import NotFoundComponent from "../../../containers/404Component";
import HeaderSection from "../../../components/commons/Header";
import EditorComponent from "../../../components/ui/editor";
import ImageUpload from "../../../components/imageUploadTest";
import { Switch } from "../../../components/ui/switch";
import { useGetCategory } from "../../../api/store/store/categorie";
import { useCreateProduct } from "../mutation/CreateProductMutation";
import { toast } from "sonner";
import SubmitButton from "../../../components/commons/buttons/SubmitButtonComponent";




export default function CreatePackagePage() {
    const { categoryId } = useParams();

    const {data: category, isLoading} = useGetCategory(Number(categoryId));

    const { handleSubmit, register, formState: { errors }, setValue, getValues } = useForm<CreateProductFormData>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            categoryId: parseInt(categoryId as string),
            visible: true, // Valor padrão inicial
        }
    });

    const {mutate: createProduct, isPending} = useCreateProduct(getValues("imageUrl"));

    function onSubmitCreateProductForm(data: CreateProductFormData) {
        if(!data.categoryId) {
            toast.error("CategoryId inválido!");
            return;
        }

        try {
            const imageFile = getValues("imageUrl");
            console.log("Arquivo de imagem:", imageFile); // Log para verificar o arquivo de imagem

            let payload: CreateProductFormData = {
                name: data.name,
                description: data.description,
                categoryId: data.categoryId,
                price: data.price,
                visible: data.visible,
            };
    
            // Se a imagem foi fornecida, adicionar as informações ao payload
            if (imageFile && imageFile instanceof File) {
                const imageInfo = {
                    size: imageFile.size,
                    type: imageFile.type,
                };
    
                // Incluir informações da imagem no payload
                payload = { ...payload, imageUrl: imageInfo };
            }
    
            // Chamar a mutação para criar a categoria
            createProduct(payload);
        } catch(error) {
            console.log(error);
        }

    }

    if(isLoading) {
        return <h1>Aguarde</h1>
    }
    if (!category) {
        return <NotFoundComponent
        title="Categoria não encontrada" 
        description="O produto que você está procurando não foi encontrado. Por favor, verifique se o ID do produto está correto ou entre em contato conosco para obter assistência."
        link="/dashboard/categorie" />
    }

    return(
        <>
        <HeaderSection title="Criar produto"/>
        <h1>Você irá criar uma produto na categoria: <span className="font-bold">{category.name}</span></h1>
        <form className="grid grid-cols-1 lg:grid-cols-5 gap-5 mt-5" onSubmit={handleSubmit(onSubmitCreateProductForm)}>
            <div className="col-span-3 space-y-5">
            <div className="rounded-lg p-5 shadow-md border space-y-5">
                <div className="grid grid-cols-2 gap-5 items-center">
                <div>
                    <label>Nome</label>
                    <Input {...register("name")} className="mt-1" />
                    {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                </div>
                <div>
                    <label>Preço</label>
                        <Input
                            {...register("price")}
                            type="number"
                            className="mt-1"
                            placeholder="Preço do produto" />
                    {errors.price && <span className='text-destructive text-[12px]'>{errors.price.message}</span>}
                </div>
                </div>
                <div>
                    <label>Descrição</label>
                    <EditorComponent {...register("description")}
                      value={getValues("description")}
                      onEditorChange={(content) => setValue('description', content)}
                    />
                    {errors.description && <span className='text-destructive text-[12px]'>{errors.description.message}</span>}
                </div>
            </div>
            </div>


            <div className="col-span-2 space-y-5">
                <div>
                    <ImageUpload 
                        id="productId" 
                        defaultImage={getValues("imageUrl")} 
                        MAX_SIZE_IMAGE={5 * 1024 * 1024 /* 5MB*/} 
                        onImageChange={(file) => setValue("imageUrl", file)} 
                    />
                </div>
                <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold text-lg">Visibilidade</h1>
                        <p>Altere a visibilidade da categoria</p>
                    </div>
                    <Switch
                        defaultChecked={true}
                        onCheckedChange={(checked) => setValue("visible", checked)} // Atualiza o valor de 'visible'
                        className="accent-primary"
                    />
                </div>
                <div className="mt-5 flex justify-end">
                <SubmitButton isLoading={isPending} text="Criar categoria"/>
                </div>
            </div>


        </form>
        </>
    )
}