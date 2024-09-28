import { useMutation } from "@tanstack/react-query"
import { orderProducts } from "../api/req/products"
import { toast } from "sonner";



export const useUpdateOrderProduct = () => {

  return useMutation({
    mutationFn: (productsIds: number[]) => orderProducts(productsIds),
    onSuccess: () => {
      toast.success("Successo");
    }
  }
  )
}