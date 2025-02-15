


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProduct } from "../api/req/products";
import type { ProductFormData } from "../schema/ProductSchema";

export const useCloneProduct = (categoryId: string | undefined) => {


  return useMutation({
    mutationFn: (data: ProductFormData) => createProduct(categoryId, data),
    onSuccess: () => {
      toast.success("Clonado com sucesso");
    }
  }
  )
}