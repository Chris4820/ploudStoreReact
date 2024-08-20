import { useNavigate, useParams } from "react-router-dom";
import { useGetCategory } from "../../../api/store/store/categorie";
import NotFoundComponent from "../../../containers/404Component";
import HeaderSection from "../../../components/commons/Header";
import SubmitButton from "../../../components/commons/buttons/SubmitButtonComponent";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LoadingComponent from "../../../containers/LoadingComponent";
import { Input } from "../../../components/ui/input";
import { useEditCategory } from "../mutation/editCategoryMutation";
import type { EditCategoryFormData } from "../schema/EditCategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import editCategorySchema from "../schema/EditCategorySchema";
import { useForm } from "react-hook-form";
import { Textarea } from "../../../components/ui/textarea";
import DeleteModal from "../../../components/modal/deleteModal";
import { Button } from "../../../components/ui/button";
import { useGetStoreInformation } from "../../../api/store/store";
import { useDeleteCategory } from "../mutation/deleteCategoryMutation";





export default function EditCategoryPage() {

    const { categoryId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        // Valida se o categoryId é um número inteiro válido
        if (!categoryId || !/^\d+$/.test(categoryId)) {
            toast.error("ID inválido!")
            navigate("/dashboard/categories");
        }
      }, [categoryId, navigate]);

      const id = parseInt(categoryId as string, 10);
    
    const {data: category, isLoading} = useGetCategory(id);
    const {data: store } = useGetStoreInformation();

    const { handleSubmit, register, formState: { errors }, getValues, watch} = useForm<EditCategoryFormData>({
        resolver: zodResolver(editCategorySchema),
        defaultValues: {
            name: category?.name,
            description: category?.description,
            slug: category?.slug,
            categoryId: id,
            visible: category?.visible,
        }
    })

    // Store initial form values in a state
    const [initialValues,] = useState(getValues());

    // Check if the form has changed
    const isFormChanged = JSON.stringify(watch()) !== JSON.stringify(initialValues);

    const { mutate: editCategory, isPending} = useEditCategory();

    function onSubmitEditCategory(data: EditCategoryFormData) {
        editCategory(data);
    }

    const parentId = category?.parentId ?? null;
    const { mutate: deleteCategory, isPending: deletePending } = useDeleteCategory(parentId, id);

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
        <HeaderSection title="Editar categoria"/>
        <form 
        className="grid grid-cols-1 lg:grid-cols-5 gap-5"
        onSubmit={handleSubmit(onSubmitEditCategory)}>
            <div className="col-span-3 space-y-5">
                <div>
                    <label>Nome</label>
                    <Input {...register("name")} className="mt-1" defaultValue={category.name}/>
                    {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                </div>
                <div>
                    <label>Descrição</label>
                    <Textarea {...register("description")} className="mt-1 h-32 resize-none" defaultValue={category.description}/>
                    {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                </div>
                <div>
                    <label>Slug</label>
                    <div className="flex mt-1">
                        <div className="h-10 border px-5 bg-muted rounded-l-md flex items-center">
                            <h1>{store?.subdomain}</h1>
                        </div>
                        <Input
                        {...register("slug")}
                        defaultValue={category.slug}
                        className="rounded-l-none"  
                        placeholder="URL bonito para esta categoria (apenas letras, números e travessões)"/>
                    </div>
                    {errors.slug && <span className='text-destructive text-[12px]'>{errors.slug.message}</span>}
                </div>
            </div>
            <div className="col-span-2 space-y-5">
                <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold text-lg">Visibilidade</h1>
                        <p>Altere a visibilidade da categoria</p>
                    </div>
                    <Input className='w-4 h-4 accent-primary' 
                        type='checkbox' {...register('visible')} id="remember" defaultChecked={category.visible}/>
                </div>
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
                <div className="mt-5 flex justify-end">
                <SubmitButton isLoading={isPending} text="Guardar alterações" enable={isFormChanged}/>
            </div>
            </div>
        </form>
        </>
    )
}