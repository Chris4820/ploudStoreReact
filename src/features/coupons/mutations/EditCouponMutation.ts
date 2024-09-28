


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { editCoupons } from "../api/req/coupons";
import { useNavigate } from "react-router-dom";
import queryClient from "../../../lib/reactquery/reactquery";
import { CouponFormData } from "../schema/CouponsSchema";

export const useEditCoupon = () => {

  const navigate = useNavigate();


  return useMutation({
    mutationFn: (data: CouponFormData) => editCoupons(data),
    onSuccess: (_) => {
      queryClient.invalidateQueries({queryKey: ['coupons']}); // Invalida todas as queries de cupons
      toast.success("Editado com sucesso!");
      navigate("/dashboard/engagement")
    }
  }
  )
}