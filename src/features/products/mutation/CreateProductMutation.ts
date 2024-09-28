import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner";
import { createProduct, type ProductsProps } from "../api/req/products";
import queryClient from "../../../lib/reactquery/reactquery";
import { uploadImage } from "../../../lib/images";
import type { ProductFormData } from "../schema/ProductSchema";


export const useCreateProduct = (image: File | null) => {
  const navigate = useNavigate();
  const { categoryId } = useParams();


  return useMutation({
    mutationFn: (data: ProductFormData) => createProduct(data),
    onSuccess: async (data, variables) => {
      //Atualizar cache
      const { signedUrl, product } = data;
        // Exemplo de como adicionar o produto à cache
        console.log(categoryId);

        const newProduct = {
          id: product.id, // ID do novo cupom
          name: variables.name, // Código do cupom que foi enviado
          visible: variables.visible, // Data de expiração
        };
        queryClient.setQueryData(['products', variables.categoryId], (oldData: ProductsProps[]) => {
          return oldData ? [newProduct, ...oldData] : [newProduct];
        });
        if (image && signedUrl) {
          console.log("Fez o upload");
          await uploadImage(signedUrl, image as File, image.type);
        }
      toast.success('Produto criado com sucesso!');
      return navigate(`/dashboard/categories/${categoryId}`)
    }
  }
  )
}