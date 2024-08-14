import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../../../../components/ui/input";
import { useForm } from "react-hook-form";
import EditorComponent from "../../../../components/ui/editor";
import ImageUpload from "../../../../components/imageUploadTest";
import { Switch } from "../../../../components/ui/switch";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../../../api/req/store/products";
import { Button } from "../../../../components/ui/button";






export default function CreateProductForm() {

  const queryClient = useQueryClient();
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();


  const createCategorieSchema = z.object({
    name: z.string().min(3, "Mínimo de 3 caracteres"),
    description: z.string().min(6, 'Mínimo de 6 caracteres'),
    categoryId: z.number().nullable().default(parseInt(searchParams.get("categoryId") as string, 10) || null),
    price: z.number(),
    imageUrl: z.any().optional(),  // Changed from string to any to accept File
});

type CreateCategorieFormData = z.infer<typeof createCategorieSchema>;

const { handleSubmit, register, formState: { errors }, setValue, getValues } = useForm<CreateCategorieFormData>({
    resolver: zodResolver(createCategorieSchema),
});

async function CreateProductHandler(data: CreateCategorieFormData) {
  if(!data.categoryId) {
    toast.error("CategoryId inválido!");
    return;
  }
  setIsLoading(true);
  productCreate(data);
}

const { mutate: productCreate } = useMutation({
  mutationFn: createProduct,
  onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', getValues("categoryId")] });
      toast('Produto criado com sucesso!');
      navigate(`/dashboard/categorie/${getValues("categoryId")}`);
  },
  onError: (error: any) => {
      const errorMessage = error?.message || 'Erro ao criar o produto. Tente novamente.';
      toast.error(errorMessage);
  },
  onSettled: () => { // Funciona como o "finally"
      setIsLoading(false); // Finaliza o estado de carregamento
  }
});





  return(
    <form className="grid grid-cols-1 lg:grid-cols-5 gap-5" onSubmit={handleSubmit(CreateProductHandler)}>
            <div className="col-span-3 space-y-5">
                <div>
                    <label>Nome</label>
                    <Input {...register("name")} className="mt-1" />
                    {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                </div>
                <div>
                    <label>Descrição</label>
                    <EditorComponent {...register("description")}
                      value={getValues("description")}
                      onEditorChange={(content) => setValue('description', content)}
                    />
                </div>
                <div>
                    <label>Preço</label>
                        <Input
                            {...register("price")}
                            type="number"
                            className="rounded-l-none"
                            placeholder="Preço do produto" />
                    {errors.price && <span className='text-destructive text-[12px]'>{errors.slug.message}</span>}
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
  )
}