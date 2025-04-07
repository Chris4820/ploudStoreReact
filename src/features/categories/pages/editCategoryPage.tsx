import { useParams } from "react-router-dom";
import { useGetCategory } from "../api/store/categorie";
import NotFoundComponent from "../../../containers/404Component";
import HeaderSection from "../../../components/commons/Header";
import LoadingComponent from "../../../containers/LoadingComponent";
import { useEditCategory } from "../mutation/editCategoryMutation";
import { useDeleteCategory } from "../mutation/deleteCategoryMutation";
import CategoryForm from "../components/CategorieForm";
import { CategoryFormData } from "../schema/CategorySchema";
import DeleteModal from "../../../components/modal/deleteModal";
import { Button } from "../../../components/ui/button";





export default function EditCategoryPage() {

    const { id } = useParams();
    
    const {data: category, isLoading} = useGetCategory(id);

    const { mutate: editCategory, isPending} = useEditCategory();

    function onSubmitEditCategory(data: CategoryFormData) {
        console.log("Chamado");
        editCategory(data);
    }

    const parentId = category?.parentId ?? undefined;

    const { mutate: deleteCategory, isPending: deletePending } = useDeleteCategory(Number(parentId), id);

    if(isLoading) {
        return <LoadingComponent/>
    }
    if (!category) {
        return <NotFoundComponent
        title="Produto não encontrado" 
        description="O produto que você está procurando não foi encontrado. Por favor, verifique se o ID do produto está correto ou entre em contato conosco para obter assistência."
        link="/dashboard/categorie" />
    }

    return(
        <>
        <HeaderSection autoBack title="Editar categoria" description="Edite a categoria aqui!"/>
        <CategoryForm mode="edit" isLoading={isPending} onSubmit={onSubmitEditCategory} initialData={category}>
            <div className="p-5 border rounded-lg flex justify-between items-center">
                <div>
                    <h1 className="font-semibold text-destructive text-lg">Eliminar categoria</h1>
                    <p className="text-muted-foreground">Elimine permanentemente a categoria</p>
                    <p className="text-destructive text-sm mt-1">*Esta ação não tem volta</p>
                </div>
                <DeleteModal 
                title="Eliminar categoria" 
                description="Todos os produtos associados a esta categoria serão eliminados permanentemente!"
                important="Esta ação não tem volta"
                onConfirm={() => deleteCategory()}>
                    <Button type="button" disabled={deletePending} variant={"destructive"}>Eliminar</Button>
                </DeleteModal>
                  
            </div>
        </CategoryForm>
        </>
    )
}