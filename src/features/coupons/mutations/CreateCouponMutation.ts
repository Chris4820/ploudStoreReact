


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { CreateCouponFormData } from "../schema/CouponsSchema";
import { createCoupons } from "../../../api/req/store/coupons";
import queryClient from "../../../lib/reactquery/reactquery";
import { useNavigate } from "react-router-dom";

export const useCreateCoupon = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateCouponFormData) => createCoupons(data),
    onSuccess: (_) => {
        queryClient.invalidateQueries({queryKey: ['coupons']}); // Invalida todas as queries de cupons
        toast.success("Coupon criado com sucesso");
        navigate ("/dashboard/engagement/coupons")
    }
  }
  )
}