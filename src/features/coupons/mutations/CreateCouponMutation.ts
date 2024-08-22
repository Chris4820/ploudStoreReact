


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { CreateCouponFormData } from "../schema/CouponsSchema";
import { createCoupons } from "../../../api/req/store/coupons";

export const useCreateCoupon = () => {


  return useMutation({
    mutationFn: (data: CreateCouponFormData) => createCoupons(data),
    onSuccess: (data, variables) => {
      toast.success("Clonado com sucesso");
    }
  }
  )
}