import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCloneProduct } from "../mutation/CloneProductMutation";
import type { CategorieProps } from "../../../api/req/store/categorie";
import { useParams } from "react-router-dom";
import { useGetAllCategorie } from "../../../api/store/store/categorie";
import { useGetProduct } from "../../../api/store/store/product";
import createProductSchema from "../schema/CreateProductSchema";
import NotFoundComponent from "../../../containers/404Component";
import LoadingComponent from "../../../containers/LoadingComponent";
import ImageUpload from "../../../components/imageUploadTest";
import { Input } from "../../../components/ui/input";
import EditorComponent from "../../../components/ui/editor";
import HeaderSection from "../../../components/commons/Header";
import { Switch } from "../../../components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import type { editProductFormData } from "../schema/EditProductSchema";
import { useEditProduct } from "../mutation/EditProductMutation";
import ConfirmModal from "../../../components/modal/confirmModal";
import SubmitButton from "../../../components/commons/buttons/SubmitButtonComponent";





export default function EditPackagePage() {

    const { productId } = useParams();
    //const queryClient = useQueryClient();

    const {data: categories} = useGetAllCategorie();

    const {data: product, isLoading} = useGetProduct(Number(productId));

    const {mutate: CloneProduct} = useCloneProduct();

    function onCloneSubmit(categoryId: number) {
        if(product) {
            product.categoryId = categoryId;
            CloneProduct(product);
        }
    }
    const { handleSubmit, register, formState: { errors }, setValue } = useForm<editProductFormData>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            productId: parseInt(productId as string),
            name: product?.name,
            description: product?.description,
            imageUrl: product?.imageUrl,
        }
    });

    const { mutate: updateProduct, isPending} = useEditProduct();

    function onSubmitFormEdit(data: editProductFormData) {
        updateProduct(data);
    }

    if(isLoading) {
        return <LoadingComponent/>
    }

    if (!product) {
        return <NotFoundComponent
        title="Produto não encontrado" 
        description="O produto que você está procurando não foi encontrado. Por favor, verifique se o ID do produto está correto ou entre em contato conosco para obter assistência."
        link="/dashboard/categorie" />
    } 


    return(
        <>
        <HeaderSection title="Editar produto"/>
        <form onSubmit={handleSubmit(onSubmitFormEdit)} className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className="col-span-3 space-y-5">
                <div>
                    <label>Nome</label>
                    <Input className="mt-1" defaultValue={product.name}/>
                    {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                </div>
                <div>
                    <label>Descrição</label>
                    <EditorComponent {...register("description")}
                      value={product.description}
                      onEditorChange={(content) => setValue('description', content)}
                    />
                    {errors.description && <span className='text-destructive text-[12px]'>{errors.description.message}</span>}
                </div>
                <div>
                    <label>Preço</label>
                    <Input className="mt-1" type="number" defaultValue={product.price}/>
                    {errors.price && <span className='text-destructive text-[12px]'>{errors.price.message}</span>}
                </div>
            </div>
            <div className="col-span-2 space-y-5">
                <div className="mt-5">
                    <ImageUpload id="productId" MAX_SIZE_IMAGE={5} defaultImage={product.imageUrl} onImageChange={() => console.log("Mudou")}/>
                </div>
                <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold text-lg">Desativar produto</h1>
                        <p>Ative a visibilidade do produto</p>
                    </div>
                    <Switch defaultChecked={true} id="enable-product" />
                </div>
                <div className="p-5 border rounded-lg">
                    <div>
                        <h1 className="font-semibold text-lg mb-2">Clonar produto</h1>
                    </div>
                    <div className="flex justify-between w-full">
                        <Select>
                        <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            {categories?.map((category : CategorieProps) => (
                                <ConfirmModal
                                title="Clonar Produto"
                                description={`Tem a certeza que pretende clonar este produto na categoria ${category.id}`}
                                onConfirm={() => onCloneSubmit(category.id)}>
                                    <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </SelectItem>
                            </ConfirmModal>
                        ))}
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                    </div>
                    
                </div>
                <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold text-lg">Quantidade</h1>
                        <p>Ative a quantidade do produto</p>
                    </div>
                    <Switch defaultChecked={true} id="enable-quantity" />
                </div>
            </div>
            <div className="mt-5 flex justify-end">
            <SubmitButton isLoading={isPending} text="Guardar alterações"/>
            </div>
        </form>
        
        </>
    )
}