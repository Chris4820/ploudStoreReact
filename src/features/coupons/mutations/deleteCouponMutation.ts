


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import queryClient from "../../../lib/reactquery/reactquery"
import { deleteCoupon } from "../api/req/coupons";


export const useDeleteCoupon = (couponId: string | undefined) => {

  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteCoupon(couponId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      // Remove o cache do servidor específico pelo ID
      queryClient.removeQueries({ queryKey: ['coupon', couponId] });
      toast('Coupon Eliminada com sucesso!!!');
      return navigate(`/dashboard/engagement`)
      }
  }
  )
}