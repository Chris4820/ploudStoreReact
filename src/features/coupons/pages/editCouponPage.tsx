import { useNavigate, useParams } from "react-router-dom"
import { useGetCoupon } from "../api/store/coupons";
import HeaderSection from "../../../components/commons/Header";
import CouponForm from "../components/CouponForm";
import LoadingComponent from "../../../containers/LoadingComponent";
import { useEditCoupon } from "../mutations/EditCouponMutation";
import type { CouponFormData } from "../schema/CouponsSchema";
import { toast } from "sonner";




export default function EditCouponPage() {

  const { couponId } = useParams(); // Especifica que couponId pode ser uma string ou undefined
  const navigate = useNavigate();

  const {data: coupon, isLoading} = useGetCoupon(couponId as string)

  const { mutate: editCoupon, isPending} = useEditCoupon();

  async function onSubmitFormEditCoupon(data: CouponFormData) {
    if(data.type === "VALUE") {
      //Verifica se o valor minimo é maior que o valor de desconto
      if(data.value < data.minValue) {
          toast("O valor mínimo precisa ser igual ou maior que o valor de desconto!");
          return;
      }
  } else {
      //Verifica se a valor de percentagem é maior que 100
      if(data.value > 100) {
          toast("A percentagem de desconto não pode ser maior que 100!");
          return;
      }
  }
   editCoupon(data);
  }

  if(isLoading) {
    return <LoadingComponent/>
  }

  if(!coupon) {
    navigate(-1);
    return null;
  }
  

  return(
    <>
            <HeaderSection title="Edite seu cupom!" description="Edite o seu coupon aqui!" backLink="../" />
              <CouponForm initialData={coupon} onSubmit={onSubmitFormEditCoupon} mode="edit" isLoading={isPending}/>
        </>
  )
}