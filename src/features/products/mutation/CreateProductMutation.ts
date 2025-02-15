import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { createProduct, type ProductsProps } from "../api/req/products";
import queryClient from "../../../lib/reactquery/reactquery";
import { uploadImage } from "../../../lib/images";
import type { ProductFormData } from "../schema/ProductSchema";


export const useCreateProduct = (categoryId: string | undefined, image: File | null) => {
  const navigate = useNavigate();

  console.log("Category: " + categoryId);

  return useMutation({
    mutationFn: (data: ProductFormData) => createProduct(categoryId, data),
    onSuccess: async (data, variables) => {
      //Atualizar cache
      const { signedUrl, product } = data;
        // Exemplo de como adicionar o produto à cache
        const existingProductsCache = queryClient.getQueryData<ProductsProps[]>(['products', categoryId]);
        if(existingProductsCache) {
          //Se o cache existir, ele adiciona o novo item ao cache
          const newProduct = {
            id: product.id, // ID do novo cupom
            name: variables.name, // Código do cupom que foi enviado
            visible: variables.visible, // Data de expiração
          };
          queryClient.setQueryData(['products', categoryId], (oldData: ProductsProps[]) => {
            return oldData ? [newProduct, ...oldData] : [newProduct];
          })
        }
        
        //Se adicionou/atualizou a imagem
        if (image && signedUrl) {
          await uploadImage(signedUrl, image as File, image.type);
        }
        toast.success('Produto criado com sucesso!');
        return navigate(`/dashboard/categories/${categoryId}`)
    }
  }
  )
}