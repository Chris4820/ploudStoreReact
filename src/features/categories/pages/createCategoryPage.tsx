import HeaderSection from "../../../components/commons/Header";
import CategoryForm from "../components/CategorieForm";
import { useCreateCategory } from "../mutation/createCategoryMutation";
import { CategoryFormData } from "../schema/CategorySchema";



export default function CreateCategoryPage() {

    const { mutate: createCategory, isPending } = useCreateCategory();

    function onSubmitCreateCategoryForm(data: CategoryFormData) {
        createCategory(data);
    }

    return(
        <>
        <HeaderSection title="Criar categoria" description="Crie uma nova categoria"/>
            <CategoryForm mode="create" onSubmit={onSubmitCreateCategoryForm} isLoading={isPending}/>
        </>
    )
}