import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner";
import type { CreateProductFormData } from "../schema/CreateProductSchema";
import { createProduct } from "../../../api/req/store/products";
import type { ProductProps } from "../../../api/req/store/categorie";
import queryClient from "../../../lib/reactquery/reactquery";


export const useCreateProduct = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();


  return useMutation({
    mutationFn: (data: CreateProductFormData) => createProduct(data),
    onSuccess: (data) => {
      const product = data.product;
      if(!product) {
        //Se o productId nao vier, renovar a cache toda
        queryClient.invalidateQueries({ queryKey: ['products', parseInt(categoryId as string) || null] });
      }else {
        // Exemplo de como adicionar o produto à cache
          queryClient.setQueryData(['products', categoryId], (oldData: ProductProps[] = []) => {
            // Adicione o novo produto à lista existente
            return [
              ...oldData,
              {
                id: product.id,
                name: product.name,
                visible: product.visible
              },
            ];
          });
        }
      toast.success('Produto criado com sucesso!');
      if(categoryId) {
        return navigate(`/dashboard/categorie/${categoryId}`)
      }
      return navigate(`/dashboard/categorie/${categoryId}`)
    }
  }
  )
}