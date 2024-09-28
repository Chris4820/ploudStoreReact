import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { deleteProduct, type ProductsProps } from "../api/req/products";
import queryClient from "../../../lib/reactquery/reactquery";

export const useDeleteProduct = () => {
  const navigate = useNavigate();

  return useMutation({
    // Modifique a função de mutação para aceitar um objeto que inclua `productId` e `categoryId`
    mutationFn: ({ productId }: { productId: number }) => deleteProduct(productId),
    onSuccess: async (_, variables: { productId: number; categoryId: number }) => {
      const { categoryId, productId } = variables;

      // Atualize o cache removendo o produto com o ID correspondente
      queryClient.setQueryData(['products', categoryId], (oldProducts: ProductsProps[] | undefined) => {
        return oldProducts?.filter(product => product.id !== productId);
      });

      // Remove o cache específico do produto
      queryClient.removeQueries({ queryKey: ['product', productId] });

      toast.success('Produto Eliminado com sucesso!');
      return navigate(`/dashboard/categories/${categoryId}`);
    }
  });
};
