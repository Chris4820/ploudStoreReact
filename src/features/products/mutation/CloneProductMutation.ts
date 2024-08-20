


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProduct } from "../../../api/req/store/products";
import type { CreateProductFormData } from "../schema/CreateProductSchema";

export const useCloneProduct = () => {


  return useMutation({
    mutationFn: (data: CreateProductFormData) => createProduct(data),
    onSuccess: (data) => {
      toast.success("Clonado com sucesso");
    }
  }
  )
}