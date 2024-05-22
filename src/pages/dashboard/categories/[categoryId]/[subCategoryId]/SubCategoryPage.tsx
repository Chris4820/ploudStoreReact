import { useNavigate, useParams } from "react-router-dom";
import { useGetCategory } from "../../../../../api/store/store/categorie";
import LoadingComponent from "../../../../../containers/LoadingComponent";
import NotFoundComponent from "../../../../../containers/404Component";
import HeaderSection from "../../../../../components/commons/Header";
import CreateButtonComponent from "../../../../../components/commons/buttons/CreateButtonComponent";
import { ProductSection } from "../../../../../containers/dashboard/categories/ProductSection";





export default function SubCategoryIdPage() {
    const params = useParams();
    const navigate = useNavigate();
    const subCategoryId = params.subCategoryId;

    const {data: category, isLoading} = useGetCategory(Number(subCategoryId));

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
            backLink 
            description={`Todos os items criados aqui, serão adicionados na categoria: ${category.name}`}/>
        <div className="flex justify-between">
            <h1 className="text-xl mt-2">Produtos</h1>
            <CreateButtonComponent
                title="Produto" 
                onClick={() => navigate(`/dashboard/product/create/${subCategoryId}`)}
            />
        </div>
        <section className="container border rounded-lg space-y-1 py-5 mt-5">
            <ProductSection categoryId={Number(subCategoryId)}/>
        </section>
        </>
    )
}