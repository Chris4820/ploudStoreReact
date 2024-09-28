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
    const { categoryId } = useParams();

    const [image, setImage] = useState<File | null>(null)

    const {data: category, isLoading} = useGetCategory(Number(categoryId));
    const {mutate: createProduct, isPending} = useCreateProduct(image);


    


    function ImageUpload(image: File | null) {
        setImage(image);
    }

    function onSubmitCreateProductForm(data: ProductFormData) {
        if(!data.categoryId) {
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
        <ProductForm onImageUpload={((image: File | null) => ImageUpload(image))} isLoading={isPending} onSubmit={onSubmitCreateProductForm} mode="create"/>
        </>
    )
}