


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProduct } from "../api/req/products";
import type { ProductFormData } from "../schema/ProductSchema";

export const useCloneProduct = () => {


  return useMutation({
    mutationFn: (data: ProductFormData) => createProduct(data),
    onSuccess: () => {
      toast.success("Clonado com sucesso");
    }
  }
  )
}