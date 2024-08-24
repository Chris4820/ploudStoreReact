import { useParams } from "react-router-dom";
import { Input } from "../../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import createProductSchema, { type CreateProductFormData } from "../schema/CreateProductSchema";
import { useForm } from "react-hook-form";
import NotFoundComponent from "../../../containers/404Component";
import HeaderSection from "../../../components/commons/Header";
import { useGetCategory } from "../../../api/store/store/categorie";
import { useCreateProduct } from "../mutation/CreateProductMutation";
import { toast } from "sonner";
import ProductForm from "../components/ProductForm";
import LoadingComponent from "../../../containers/LoadingComponent";




export default function CreatePackagePage() {
    const { categoryId } = useParams();

    const {data: category, isLoading} = useGetCategory(Number(categoryId));
    const {mutate: createProduct, isPending} = useCreateProduct();
    


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
        <ProductForm isLoading={isPending} onSubmit={onSubmitCreateProductForm} mode="create"/>
        </>
    )
}