import { useNavigate, useParams } from "react-router-dom";
import { ProductSection } from "../../../../containers/dashboard/categories/ProductSection";
import { Button } from "../../../../components/ui/button";
import { MdOutlineAddCircle } from "react-icons/md";
import BackComponent from "../../../../components/commons/BackComponent";
import { useGetCategory } from "../../../../api/store/store/categorie";
import NotFoundComponent from "../../../../containers/404Component";
import { CategorieSection } from "../../../../containers/dashboard/categories/CategorieSection";
import LoadingComponent from "../../../../containers/LoadingComponent";
import HeaderSection from "../../../../components/commons/Header";
import CreateButtonComponent from "../../../../components/commons/buttons/CreateButtonComponent";





export default function CategoryIdPage() {
    const params = useParams();
    const navigate = useNavigate();
    const categoryId = params.categoryId;

    const {data: category, isLoading} = useGetCategory(Number(categoryId));

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
            toLink="../categorie"
            description={`Todos os items criados aqui, serão adicionados na categoria: ${category.name}`}/>
        <div className="flex justify-between">
            <h1 className="text-xl mt-2">Produtos</h1>
            <CreateButtonComponent
                title="Produto" 
                onClick={() => navigate(`/dashboard/product/create/${categoryId}`)}
            />
        </div>
        <section className="container border rounded-lg space-y-1 py-5 mt-5">
            <ProductSection categoryId={Number(categoryId)}/>
        </section>

        <div className="flex justify-between w-full items-center mt-5">
        <h1 className="text-xl mt-2">Sub-Categorias</h1>
        <CreateButtonComponent
            title="Sub-Categoria" 
            onClick={() => navigate(`/dashboard/category/create?parent=${categoryId}`)}
        />
        </div>
        <section className="container border rounded-lg space-y-1 py-5 mt-5">
            <CategorieSection parentCategoryId={Number(categoryId)}/>
        </section>
        </>
    )
}