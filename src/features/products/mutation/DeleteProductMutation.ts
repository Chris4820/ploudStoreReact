import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { deleteProduct, type ProductsProps } from "../api/req/products";
import queryClient from "../../../lib/reactquery/reactquery";

export const useDeleteProduct = (productId: string | undefined) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: async (data) => {
      const { id, categoryId } = data;

      const existingProductsInCache = queryClient.getQueryData<ProductsProps[]>(['products', categoryId.toString()]);

      if(existingProductsInCache) {
        // Remove o produto eliminado do cache
        queryClient.setQueryData(['products', categoryId.toString()], (oldProducts: ProductsProps[] | undefined) => {
          
        return oldProducts?.filter(product => product.id !== id);
        });
      }
      // Remove o cache do produto eliminado
      queryClient.removeQueries({ queryKey: ['product', id.toString()]});

      toast.success('Produto Eliminado com sucesso!');
      return navigate(`/dashboard/categories/${categoryId}`);
    }
  });
};
