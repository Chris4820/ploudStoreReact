import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { deleteProduct, type ProductsProps } from "../api/req/products";
import queryClient from "../../../lib/reactquery/reactquery";

export const useDeleteProduct = (productId: string) => {
  const navigate = useNavigate();

  if (!productId) {
    throw new Error("Product ID is required");
  }

  return useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: async (data) => {
      const { categoryId } = data;

      console.log(data);

      // Update products cache
      queryClient.setQueryData(['products', categoryId.toString()], (oldProducts: ProductsProps[] | undefined) => {
        return oldProducts ? oldProducts.filter(product => product.id !== Number(productId)) : [];
      });

      // Remove single product cache
      queryClient.removeQueries({ queryKey: ['product', productId] });

      toast.success('Produto eliminado com sucesso!');
      navigate(`/dashboard/categories/${categoryId}`);
    },
  });
};
