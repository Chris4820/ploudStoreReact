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
import { createCategorie } from "../../../../api/req/store/categorie";
import { toast } from "sonner";
import { Textarea } from "../../../../components/ui/textarea";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";

export default function CreateCategoryForm({ parentId }: { parentId?: number | null }) {

    const queryClient = useQueryClient();
    const { data: store } = useGetStoreInformation();
    const navigate = useNavigate();
    const [loading, setIsLoading] = useState(false);

    const createCategorieSchema = z.object({
        name: z.string().min(3, "Mínimo de 3 caracteres"),
        description: z.string().min(6, 'Mínimo de 6 caracteres'),
        categoryParentId: z.number().nullable().default(parentId ?? null),
        slug: z.string(),
        imageUrl: z.any().optional(),  // Changed from string to any to accept File
        enable: z.boolean(),
    });

    type CreateCategorieFormData = z.infer<typeof createCategorieSchema>;

    const { handleSubmit, register, formState: { errors }, setValue, getValues } = useForm<CreateCategorieFormData>({
        resolver: zodResolver(createCategorieSchema),
    });

    async function CreateCategoryHandler(data: CreateCategorieFormData) {
        setIsLoading(true);
        categorieCreate(data);
    }

    const { mutate: categorieCreate } = useMutation({
        mutationFn: createCategorie,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories', parentId] });
            toast('Categoria criada com sucesso!');
            if (parentId) {
                navigate(`/dashboard/categorie/${parentId}`);
            } else {
                navigate('/dashboard/categorie');
            }
        },
        onError: (error: any) => {
            const errorMessage = error?.message || 'Erro ao criar a categoria. Tente novamente.';
            toast.error(errorMessage);
        },
        onSettled: () => { // Funciona como o "finally"
            setIsLoading(false); // Finaliza o estado de carregamento
        }
    });

    /*async function sendCreateCategorie(data: CreateCategorieFormData) {
        try {
            const imageFile = getValues("imageUrl");
    
            if (imageFile && imageFile instanceof File) {  
                console.log('Arquivo da imagem:', imageFile);
    
                const fileExtension = imageFile.name.split('.').pop();
                console.log('Extensão do arquivo:', fileExtension);
    
                console.log('Solicitando URL assinada...');
                const response = await axiosStore.post('generate-signed-url', {
                    fileExtension,
                });
    
                if (response.status === 200) {
                    const { signedUrl, fileName } = response.data;
                    console.log('URL assinada recebida:', signedUrl);
                    console.log('Nome do arquivo:', fileName);
    
                    console.log('Iniciando o upload...');
                    const uploadResponse = await fetch(signedUrl, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': imageFile.type, // Certifique-se de que o tipo de conteúdo está correto
                        },
                        body: imageFile,
                    });
    
                    if (uploadResponse.ok) {
                        console.log('Upload bem-sucedido!');
                        data.imageUrl = fileName;
                    } else {
                        console.error('Erro no upload:', uploadResponse.statusText);
                        const errorText = await uploadResponse.text();
                        console.error('Detalhes do erro:', errorText);
                    }
                } else {
                    console.error('Erro ao obter URL assinada:', response.statusText);
                    const errorText = await response.text();
                    console.error('Detalhes do erro ao obter URL assinada:', errorText);
                }
            } else {
                console.error('O arquivo da imagem não está disponível ou não é um tipo de arquivo válido.');
            }
        } catch (error) {
            console.error('Erro ao criar a categoria:', error);
        }
    }*/
    
    

    return (
        <form className="grid grid-cols-1 lg:grid-cols-5 gap-5" onSubmit={handleSubmit(CreateCategoryHandler)}>
            <div className="col-span-3 space-y-5">
                <div>
                    <label>Nome</label>
                    <Input {...register("name")} className="mt-1" />
                    {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                </div>
                <div>
                    <label>Descrição</label>
                    <Textarea {...register("description")} className="mt-1 h-32 resize-none" />
                    {errors.description && <span className='text-destructive text-[12px]'>{errors.description.message}</span>}
                </div>
                <div>
                    <label>Slug</label>
                    <div className="flex mt-1">
                        <div className="h-10 border px-5 bg-muted rounded-l-md flex items-center">
                            <h1>{store?.subdomain}</h1>
                        </div>
                        <Input
                            {...register("slug")}
                            className="rounded-l-none"
                            placeholder="URL bonito para esta categoria (apenas letras, números e travessões)" />
                    </div>
                    {errors.slug && <span className='text-destructive text-[12px]'>{errors.slug.message}</span>}
                </div>
            </div>
            <div className="col-span-2 space-y-5">
                <div className="mt-5">
                    <ImageUpload 
                        id="productId" 
                        defaultImage={getValues("imageUrl")} 
                        MAX_SIZE_IMAGE={5 * 1024 * 1024 /* 5MB*/} 
                        onImageChange={(file) => setValue("imageUrl", file)} 
                    />
                </div>
                <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold text-lg">Visibilidade</h1>
                        <p>Altere a visibilidade da categoria</p>
                    </div>
                    <Switch defaultChecked={true} id="enable-product" />
                </div>
                <div className="mt-5 flex justify-end">
                    <Button type="submit" disabled={loading}>
                        {loading ? <span className="flex gap-2 items-center justify-center"> <CgSpinner className="w-2 h-2 animate-spin"/> <span>Criando...</span></span> 
                        
                        : 
                        "Criar categoria"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
