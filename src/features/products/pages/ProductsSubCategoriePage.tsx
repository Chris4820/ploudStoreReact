import { useNavigate, useParams } from "react-router-dom";
import { useGetCategory } from "../../categories/api/store/categorie";
import LoadingComponent from "../../../containers/LoadingComponent";
import NotFoundComponent from "../../../containers/404Component";
import HeaderSection from "../../../components/commons/Header";
import CreateButtonComponent from "../../../components/commons/buttons/CreateButton";
import { ProductSection } from "../components/ProductSection";





export default function SubCategoryIdPage() {
    const navigate = useNavigate();
    const { subCategoryId } = useParams<{ subCategoryId: string }>(); // Pegar o id da URL

    const {data: category, isLoading} = useGetCategory(subCategoryId);

    if(isLoading) {
        return <LoadingComponent/>
    }
    if(!category) {
        return <NotFoundComponent title="SubCategoria não encontrada" description="AAAA"/>
    }

    return(
        <>
        <HeaderSection
            title={category.name} 
            backLink={`../categories/${category.id}`} 
            description={`Todos os items criados aqui, serão adicionados na categoria: ${category.name}`}/>
        <div className="flex justify-between">
            <h1 className="text-xl mt-2">Produtos</h1>
            <CreateButtonComponent
                title="Produto" 
                onClick={() => navigate(`/dashboard/product/create/${subCategoryId}`)}
            />
        </div>
        <section className="container border rounded-lg space-y-1 py-5 mt-5">
            <ProductSection categoryId={subCategoryId}/>
        </section>
        </>
    )
}