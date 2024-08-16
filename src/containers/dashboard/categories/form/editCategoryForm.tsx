import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../../../components/ui/button";
import ImageUpload from "../../../../components/imageUploadTest";
import { Input } from "../../../../components/ui/input";
import { useGetStoreInformation } from "../../../../api/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategorieProps, deleteCategorie, updateCategory } from "../../../../api/req/store/categorie";
import { toast } from "sonner";
import { Textarea } from "../../../../components/ui/textarea";
import DeleteModal from "../../../../components/modal/deleteModal";
import SubmitButton from "../../../../components/commons/buttons/SubmitButtonComponent";
import { useState } from "react";



export default function EditCategoryForm({category, parentId }: { category: CategorieProps, parentId: number | null }) {

    const queryClient = useQueryClient();
    const {data: store} = useGetStoreInformation();
    const navigate = useNavigate();

    const editCategorieSchema = z.object({
        name: z.string().min(3, "Mínimo de 3 caracteres"),
        description: z.string().min(6, 'Mínimo de 6 caracteres'),
        id: z.number(),
        slug: z.string().min(3, "Minimo de 3 caracters").regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hifens"),
        imageUrl: z.string(),
        enable: z.boolean(),
    })

    

    type editCategorieFormData = z.infer<typeof editCategorieSchema>
    const { handleSubmit, register, formState: { errors }, setValue, getValues, watch} = useForm<editCategorieFormData>({
        resolver: zodResolver(editCategorieSchema),
        defaultValues: {
            name: category.name,
            description: category.description,
            slug: category.slug,
            imageUrl: category.imageUrl,
            id: category.id,
            enable: category.enable,
        }
    })

    // Store initial form values in a state
    const [initialValues,] = useState(getValues());

    // Check if the form has changed
    const isFormChanged = JSON.stringify(watch()) !== JSON.stringify(initialValues);


    async function EditCategoryHandler(data: editCategorieFormData) {
        try {
            categorieEdit(data);
        } catch (error) {
            console.log(error);
        }
    }

    const { mutate: categorieEdit, isPending } = useMutation({
        mutationFn: updateCategory,
        onSuccess: () => {
            const updatedCategory = getValues();
            // Atualiza o cache da categoria específica
            queryClient.setQueryData(['category', updatedCategory.id], updatedCategory);
            // Atualiza o cache das categorias, encontrando a que tem o ID específico e substituindo
                queryClient.setQueryData(['categories', parentId], (oldCategories: CategorieProps[] | undefined) => {
                    return oldCategories?.map(cat => 
                        cat.id === updatedCategory.id ? updatedCategory : cat
                    );
                });
            toast('Categoria atualizada com sucesso!');
            if(!parentId) {
                return navigate('/dashboard/categorie')
            }
            return navigate(`/dashboard/categorie/${parentId}`)
            
        }
    });
    
    const { mutate: categorieDelete } = useMutation({
        mutationFn: deleteCategorie,
        onSuccess: () => {
            // Remove a categoria do cache sem recarregar todos os dados
            queryClient.setQueryData(['categories', parentId], (oldCategories: CategorieProps[] | undefined) => {
                return oldCategories?.filter(cat => cat.id !== category.id);
            });
            // Remove o cache do servidor específico pelo ID
            queryClient.removeQueries({ queryKey: ['category', category.id] });
            toast('Categoria Eliminada com sucesso!!!');
            
            if(!parentId) {
                return navigate('/dashboard/categorie')
            }
            return navigate(`/dashboard/categorie/${parentId}`)
            }
    });

    return(
        <form 
        className="grid grid-cols-1 lg:grid-cols-5 gap-5"
        onSubmit={handleSubmit(EditCategoryHandler)}>
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
                <div className="mt-5">
                    <ImageUpload id="productId" defaultImage={getValues("imageUrl")} MAX_SIZE_IMAGE={5 * 1024 * 1024 /* 5MB*/} onImageChange={(imageUrl) => setValue("imageUrl", imageUrl)} />
                </div>
                <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold text-lg">Visibilidade</h1>
                        <p>Altere a visibilidade da categoria</p>
                    </div>
                    <Input className='w-4 h-4 accent-primary' 
                        type='checkbox' {...register('enable')} id="remember" defaultChecked={category.enable}/>
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
                    onConfirm={() => categorieDelete(category.id)}>
                        <Button type="button" variant={"destructive"}>Eliminar</Button>
                    </DeleteModal>
                    
                </div>
                <div className="mt-5 flex justify-end">
                <SubmitButton isLoading={isPending} text="Guardar alterações" enable={isFormChanged}/>
            </div>
            </div>
        </form>
    )

}

