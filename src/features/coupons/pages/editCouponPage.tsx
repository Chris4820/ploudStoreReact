import { useNavigate, useParams } from "react-router-dom"
import { useGetCoupon } from "../../../api/store/store/coupons";
import HeaderSection from "../../../components/commons/Header";
import CouponForm from "../components/CouponForm";
import SubmitButton from "../../../components/commons/buttons/SubmitButtonComponent";
import LoadingComponent from "../../../containers/LoadingComponent";
import { CreateCouponFormData } from "../schema/CouponsSchema";
import { useEffect } from "react";
import { toast } from "sonner";




export default function EditCouponPage() {

  const { couponId } = useParams(); // Especifica que couponId pode ser uma string ou undefined
  const navigate = useNavigate();

  const {data: coupon, isLoading} = useGetCoupon(couponId)

  function onSubmitFormEditCoupon(data: CreateCouponFormData) {
    console.log(data);
  }
  if(isLoading) {
    return <LoadingComponent/>
  }

  if(!coupon) {
    navigate(-1);
    return null;
  }

  console.log(coupon);

  return(
    <>
            <HeaderSection title="Edite seu cupom!" description="Edite o seu coupon aqui!" backLink />
            <CouponForm initialData={coupon} onSubmit={onSubmitFormEditCoupon} mode="edit"/>
        </>
  )
}