import { useParams } from "react-router-dom";
import NotFoundComponent from "../../../containers/404Component";
import HeaderSection from "../../../components/commons/Header";
import { useGetCategory } from "../../categories/api/store/categorie";
import { useCreateProduct } from "../mutation/CreateProductMutation";
import { toast } from "sonner";
import ProductForm from "../components/ProductForm";
import LoadingComponent from "../../../containers/LoadingComponent";
import { useState } from "react";
import type { ProductFormData } from "../schema/ProductSchema";




export default function CreatePackagePage() {

    const [image, setImage] = useState<File | null>(null)

    const { categoryId } = useParams<{ categoryId: string }>(); // Pegar o id da URL

    const {data: category, isLoading} = useGetCategory(categoryId);
    const {mutate: createProduct, isPending} = useCreateProduct(categoryId, image);

    function ImageUpload(image: File | null) {
        setImage(image);
    }

    function onSubmitCreateProductForm(data: ProductFormData) {
        if(!categoryId) {
            toast.error("CategoryId inválido!");
            return;
        }
        createProduct(data);
    }

    if(isLoading) {
        return <LoadingComponent/>
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
        <ProductForm 
            onImageUpload={((image: File | null) => ImageUpload(image))} 
            isSubmit={isPending} 
            onSubmit={onSubmitCreateProductForm}
            buttonText="Criar" 
            />
        </>
    )
}