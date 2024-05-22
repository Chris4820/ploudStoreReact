import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../../../components/ui/button";
import ImageUpload from "../../../../components/imageUploadTest";
import { Input } from "../../../../components/ui/input";
import { useGetStoreInformation } from "../../../../api/store/store";
import { Switch } from "../../../../components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategorieProps, updateCategory } from "../../../../api/req/store/categorie";
import { toast } from "sonner";
import { Textarea } from "../../../../components/ui/textarea";
import { ModalDeleteCategorie } from "../../../modal/categorie/modalDeleteCategorie";



export default function EditCategoryForm({category, parentId }: { category: CategorieProps, parentId: number | null }) {

    const queryClient = useQueryClient();
    const {data: store} = useGetStoreInformation();
    const navigate = useNavigate();

    console.log("PARENT ANTES::" + parentId);

    const editCategorieSchema = z.object({
        name: z.string().min(3, "Mínimo de 3 caracteres").default(category.name),
        description: z.string().min(6, 'Mínimo de 6 caracteres').default(category.description),
        categoryId: z.number().default(category.categoryId),
        slug: z.string().default(() => category.slug ?? ""),
        imageUrl: z.string().default(category.imageUrl),
    })

    type editCategorieFormData = z.infer<typeof editCategorieSchema>
    const { handleSubmit, register, formState: { errors }, setValue, getValues} = useForm<editCategorieFormData>({
        resolver: zodResolver(editCategorieSchema),
    })


    const { mutate: categorieEdit } = useMutation({
        mutationFn: updateCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories']  });
            toast('Categoria atualizada com sucesso!');
                return navigate('/dashboard/categorie')
        }
    });

    async function sendEditCategorie(data: editCategorieFormData) {
        try {
            categorieEdit(data);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <form 
        className="grid grid-cols-1 lg:grid-cols-5 gap-5"
        onSubmit={handleSubmit(sendEditCategorie)}>
            <div className="col-span-3 space-y-5">
                <div>
                    <label>Nome</label>
                    <Input {...register("name")} className="mt-1" defaultValue={category.name}/>
                    {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                </div>
                <div>
                    <label>Descrição</label>
                    <Textarea {...register("description")} className="mt-1 h-32 resize-none"/>
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
                    <ModalDeleteCategorie category={category} parentId={parentId ? Number(parentId) : null}>
                        <Button type="button" variant={"destructive"}>Eliminar</Button>
                    </ModalDeleteCategorie>
                </div>
                <div className="mt-5 flex justify-end">
                <Button type="submit">Guardar alterações</Button>
            </div>
            </div>
        </form>
    )

}

