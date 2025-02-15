import { useCloneProduct } from "../mutation/CloneProductMutation";
import type { CategorieProps } from "../../categories/api/req/categorie";
import { useParams } from "react-router-dom";
import { useGetAllCategorie } from "../../categories/api/store/categorie";
import { useGetProduct } from "../api/store/product";
import NotFoundComponent from "../../../containers/404Component";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { useEditProduct } from "../mutation/EditProductMutation";
import ConfirmModal from "../../../components/modal/confirmModal";
import ProductForm from "../components/ProductForm";
import type { ProductFormData } from "../schema/ProductSchema";
import LoadingComponent from "../../../containers/LoadingComponent";
import HeaderSection from "../../../components/commons/Header";
import { useState } from "react";
import DeleteModal from "../../../components/modal/deleteModal";
import { Button } from "../../../components/ui/button";
import { useDeleteProduct } from "../mutation/DeleteProductMutation";





export default function EditProductPage() {

    const { productId } = useParams();

    const [cloneCategoryId, setCloneCategoryId] = useState<string | undefined>(undefined);

    const {data: categories} = useGetAllCategorie();

    const [image, setImage] = useState<File | null>(null)

    const {data: product, isLoading} = useGetProduct(productId);

    const {mutate: CloneProduct, isPending: cloneProductPending} = useCloneProduct(cloneCategoryId);

    const { mutate: deleteProduct, isPending: DeletePending} = useDeleteProduct(productId);

    const { mutate: updateProduct, isPending} = useEditProduct(Number(productId), image);

    function onSubmitFormEdit(data: ProductFormData) {
        updateProduct(data);
    }

    function ImageUpload(image: File | null) {
        setImage(image);
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
        <section className="relative w-full overflow-y-auto overflow-x-hidden">
        <HeaderSection backLink="../" title="Editar produto" description="Edite seu produto aqui!"/>
        <ProductForm 
            onImageUpload={((image: File | null) => ImageUpload(image))} 
            isSubmit={isPending} onSubmit={onSubmitFormEdit} 
            initialData={product}
            buttonText="Editar">
            <>
            <div className="p-5 border rounded-lg">
                    <div>
                        <h1 className="font-semibold text-lg mb-2">Clonar produto</h1>
                    </div>
                    <div className="flex justify-between w-full gap-5">
                        <Select onValueChange={setCloneCategoryId}> {/* Atualiza o estado ao selecionar uma categoria */}
                        <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            {categories?.map((category : CategorieProps) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </SelectItem>
                           
                            ))}
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                        <ConfirmModal
                                title="Clonar Produto"
                                description={`Tem a certeza que pretende clonar este produto na categoria ${cloneCategoryId}`}
                                onConfirm={() => CloneProduct(product)}>
                            <Button
                            disabled={cloneProductPending || !cloneCategoryId}>Clonar</Button>
                         </ConfirmModal>
                    </div>
            </div>
            <div className="p-5 border rounded-lg flex justify-between items-center">
                <div>
                    <h1 className="font-semibold text-destructive text-lg">Eliminar Produto</h1>
                    <p className="text-muted-foreground">Elimine permanentemente o produto</p>
                    <p className="text-destructive text-sm mt-1">*Esta ação não tem volta</p>
                </div>
                <DeleteModal
                title="Eliminar produto" 
                description="Este produto será apagado permanentemente, tem a certeza?"
                important="Esta ação não tem volta"
                onConfirm={() => deleteProduct()}>
                    <Button type="button" disabled={DeletePending} variant={"destructive"}>Eliminar</Button>
                </DeleteModal>
                  
            </div>
            </>
        </ProductForm>
        </section>
    )
}