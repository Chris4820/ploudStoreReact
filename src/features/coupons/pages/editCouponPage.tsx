import { useNavigate, useParams } from "react-router-dom"
import { useGetCoupon } from "../../../api/store/store/coupons";
import HeaderSection from "../../../components/commons/Header";
import CouponForm from "../components/CouponForm";
import LoadingComponent from "../../../containers/LoadingComponent";
import { CreateCouponFormData } from "../schema/CouponsSchema";
import { useEditCoupon } from "../mutations/EditCouponMutation";
import { Profiler } from "react";




export default function EditCouponPage() {

  const { couponId } = useParams(); // Especifica que couponId pode ser uma string ou undefined
  const navigate = useNavigate();

  const {data: coupon, isLoading} = useGetCoupon(couponId)

  const { mutate: editCoupon, isPending} = useEditCoupon();

  async function onSubmitFormEditCoupon(data: CreateCouponFormData) {
   editCoupon(data);
  }

  function onRenderCallback(
    id, // ID do componente Profiler
    phase, // "mount" ou "update"
    actualDuration, // Tempo gasto na renderização
    baseDuration, // Tempo médio para renderizar sem otimizações
    startTime, // Quando a renderização começou
    commitTime, // Quando a renderização foi confirmada
    interactions // Conjunto de interações que foram rastreadas durante a renderização
  ) {
    console.log(`${id} renderizou na fase ${phase} e levou ${actualDuration}ms`);
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
            <Profiler id="Form" onRender={onRenderCallback}>
              <CouponForm initialData={coupon} onSubmit={onSubmitFormEditCoupon} mode="edit" isLoading={isPending}/>
            </Profiler>
        </>
  )
}