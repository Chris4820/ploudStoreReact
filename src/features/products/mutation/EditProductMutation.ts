import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { updateProduct, type ProductsProps } from "../api/req/products";
import queryClient from "../../../lib/reactquery/reactquery";
import type { ProductFormData } from "../schema/ProductSchema";
import { uploadImage } from "../../../lib/images";


export const useEditProduct = (productId: number, image: File | null) => {
  const navigate = useNavigate();


  return useMutation({
    mutationFn: (data: ProductFormData) => updateProduct(productId, data),
    onSuccess: async (data, variables) => {
      const { signedUrl } = data;
      queryClient.setQueryData(['products', variables.categoryId], (oldData: ProductsProps[] | undefined) => {
        if(!oldData) {
          return queryClient.removeQueries({queryKey: ['products', variables.categoryId]}); // Invalida todas as queries de cupons
          //Se nao tiver cache, é atualizado tudo
          //return queryClient.invalidateQueries({ queryKey: ['products', variables.categoryId]});
        }
        return oldData.map((product: ProductsProps) =>
          product.id === variables.id 
            ? {
                ...product,
                name: variables.name !== undefined ? variables.name : product.name,
                visible: variables.visible !== undefined ? variables.visible : product.visible,
              }
            : product
        );
      });
      //Invalida a produto editada do cache
      queryClient.removeQueries({queryKey: ['product', variables.id]});
      if (image && signedUrl) {
        await uploadImage(signedUrl, image as File, image.type);
      }
      toast.success('Produto editado com sucesso!');
      if(variables.categoryId) {
        return navigate(`/dashboard/categories/${variables.categoryId}`)
      }
      return navigate(`/dashboard/categories`)
    }
  }
  )
}