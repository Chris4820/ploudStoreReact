import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../../../components/ui/button";
import ImageUpload from "../../../../components/imageUploadTest";
import { Input } from "../../../../components/ui/input";
import { useGetStoreInformation } from "../../../../api/store/store";
import { Switch } from "../../../../components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategorieProps, deleteCategorie, updateCategory } from "../../../../api/req/store/categorie";
import { toast } from "sonner";
import { Textarea } from "../../../../components/ui/textarea";
import DeleteModal from "../../../../components/modal/deleteModal";



export default function EditCategoryForm({category, parentId }: { category: CategorieProps, parentId: number | null }) {

    const queryClient = useQueryClient();
    const {data: store} = useGetStoreInformation();
    const navigate = useNavigate();

    const editCategorieSchema = z.object({
        name: z.string().min(3, "Mínimo de 3 caracteres").default(category.name),
        description: z.string().min(6, 'Mínimo de 6 caracteres').default(category.description),
        id: z.number().default(category.id),
        slug: z.string().default(() => category.slug ?? ""),
        imageUrl: z.string().default(category.imageUrl),
    })

    type editCategorieFormData = z.infer<typeof editCategorieSchema>
    const { handleSubmit, register, formState: { errors }, setValue, getValues} = useForm<editCategorieFormData>({
        resolver: zodResolver(editCategorieSchema),
    })



    async function EditCategoryHandler(data: editCategorieFormData) {
        try {
            categorieEdit(data);
        } catch (error) {
            console.log(error);
        }
    }

    const { mutate: categorieEdit } = useMutation({
        mutationFn: updateCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories']  });
            toast('Categoria atualizada com sucesso!');
                return navigate('/dashboard/categorie')
        }
    });
    
    const { mutate: categorieDelete } = useMutation({
        mutationFn: deleteCategorie,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories', parentId] });
            toast('Categoria Eliminada com sucesso!');
            
            return navigate(-1);
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
                    {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
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
                    <Switch defaultChecked={true} id="enable-product" />
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
                <Button type="submit">Guardar alterações</Button>
            </div>
            </div>
        </form>
    )

}

