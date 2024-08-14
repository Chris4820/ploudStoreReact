import { useParams } from "react-router-dom";
import HeaderSection from "../../../../components/commons/Header";
import { useGetCategory } from "../../../../api/store/store/categorie";
import NotFoundComponent from "../../../../containers/404Component";
import CreateProductForm from "../../../../containers/dashboard/products/forms/createProductForm";




export default function CreatePackagePage() {
    const { categoryId } = useParams();

    const {data: category, isLoading} = useGetCategory(Number(categoryId));

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
        <CreateProductForm/>
        </>
    )
}