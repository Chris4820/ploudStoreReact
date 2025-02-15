


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { type CouponFormData } from "../schema/CouponsSchema";
import { createCoupons } from "../api/req/coupons";
import queryClient from "../../../lib/reactquery/reactquery";
import { useNavigate } from "react-router-dom";

export const useCreateCoupon = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CouponFormData) => createCoupons(data),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['coupons']});
        queryClient.invalidateQueries({queryKey: ['totalCoupons']});
        toast.success("Coupon criado com sucesso");
        navigate ("/dashboard/engagement")
    }
  }
  )
}