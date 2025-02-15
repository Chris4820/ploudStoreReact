import { useNavigate, useParams } from "react-router-dom";
import HeaderSection from "../../../components/commons/Header";
import NotFoundComponent from "../../../containers/404Component";
import LoadingComponent from "../../../containers/LoadingComponent";
import { useGetCategory } from "../api/store/categorie";
import CreateButtonComponent from "../../../components/commons/buttons/CreateButtonComponent";
import { ProductSection } from "../../products/components/ProductSection";
import { CategorieSection } from "../components/CategorieSection";





export default function CategoryIdPage() {
    const params = useParams();
    const navigate = useNavigate();
    const categoryId = params.categoryId;

    const {data: category, isLoading} = useGetCategory(categoryId);

    if(isLoading) {
        return <LoadingComponent/>
    }
    if(!category) {
        return <NotFoundComponent title="Categoria não encontrada" description="AAAA"/>
    }

    return(
        <>
        <HeaderSection 
            title={category.name} 
            backLink="../categories"
            description={`Todos os items criados aqui, serão adicionados na categoria: ${category.name}`}/>
        <div className="flex justify-between">
            <h1 className="text-xl mt-2">Produtos</h1>
            <CreateButtonComponent
                title="Produto" 
                onClick={() => navigate(`/dashboard/product/create/${categoryId}`)}
            />
        </div>
        <section className="container border rounded-lg space-y-1 py-5 mt-5">
            <ProductSection categoryId={categoryId}/>
        </section>

        <div className="flex justify-between w-full items-center mt-5">
        <h1 className="text-xl mt-2">Sub-Categorias</h1>
        <CreateButtonComponent
            title="Sub-Categoria" 
            onClick={() => navigate(`/dashboard/categories/create?parent=${categoryId}`)}
        />
        </div>
        <section className="container border rounded-lg space-y-1 py-5 mt-5">
            <CategorieSection parentCategoryId={categoryId}/>
        </section>
        </>
    )
}