


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { CreateCouponFormData } from "../schema/CouponsSchema";
import { editCoupons } from "../../../api/req/store/coupons";
import { useNavigate } from "react-router-dom";

export const useEditCoupon = () => {

  const navigate = useNavigate();


  return useMutation({
    mutationFn: (data: CreateCouponFormData) => editCoupons(data),
    onSuccess: (data, variables) => {
      toast.success("Editado com sucesso!");
      navigate("/dashboard/engagement/coupons")
    }
  }
  )
}