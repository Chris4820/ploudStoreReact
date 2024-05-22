import { useSearchParams } from "react-router-dom";
import HeaderSection from "../../../../components/commons/Header";
import { useGetCategory } from "../../../../api/store/store/categorie";
import NotFoundComponent from "../../../../containers/404Component";
import CreateCategoryForm from "../../../../containers/dashboard/categories/form/createCategoryForm";



export default function CreateCategoryPage() {

    const [searchParams] = useSearchParams();
    const parent = searchParams.get("parent");


    //Se não for uma subcategoria
    if(!parent) {
        console.log("Não existe")
        return(
            <>
            <HeaderSection title="Criar categoria" description="Crie uma nova categoria"/>

            <CreateCategoryForm parentId={null}/>
            </>
        )
    }

    //Se for uma subcategoria
    const {data: category, isLoading} = useGetCategory(Number(parent));


    if(isLoading) {
        return <h1>Aguarde...</h1>
    }

    if(!category) {
        return <NotFoundComponent title="Categoria não encontrada" description="AAAAA"/>
    }

    return(
        <>
        <HeaderSection title="Criar categoria" description="Crie uma nova categoria"/>

        {category && (
            <div className="w-full h-auto border rounded-lg p-5">
                <h1 className="text-lg font-semibold">SubCategoria</h1>
                <p>Esta categoria será criada dentro da categoria: {category.name}</p>
            </div>
        )}

            <CreateCategoryForm parentId={category?.categoryId}/>
        </>
    )
}