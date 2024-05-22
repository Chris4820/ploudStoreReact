import { useParams, useSearchParams } from "react-router-dom";
import HeaderSection from "../../../../components/commons/Header";
import NotFoundComponent from "../../../../containers/404Component";
import { useGetCategory } from "../../../../api/store/store/categorie";
import EditCategoryForm from "../../../../containers/dashboard/categories/form/editCategoryForm";





export default function EditCategoryPage() {

    const { categoryId } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const parentId = searchParams.get("parent");

    const {data: category, isLoading} = useGetCategory(Number(categoryId));

    if(isLoading) {
        return <h1>Aguarde</h1>
    }
    if (!category) {
        return <NotFoundComponent
        title="Produto não encontrado" 
        description="O produto que você está procurando não foi encontrado. Por favor, verifique se o ID do produto está correto ou entre em contato conosco para obter assistência."
        link="/dashboard/categorie" />
    }
      


    return(
        <>
        <HeaderSection title="Editar categoria"/>
        <EditCategoryForm category={category} parentId={parentId ? Number(parentId) : null}/>
        </>
    )
}