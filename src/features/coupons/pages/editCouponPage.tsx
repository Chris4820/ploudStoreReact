import { useNavigate, useParams } from "react-router-dom"
import { useGetCoupon } from "../api/store/coupons";
import HeaderSection from "../../../components/commons/Header";
import CouponForm from "../components/CouponForm";
import LoadingComponent from "../../../containers/LoadingComponent";
import { useEditCoupon } from "../mutations/EditCouponMutation";
import type { CouponFormData } from "../schema/CouponsSchema";
import { toast } from "sonner";
import DeleteModal from "../../../components/modal/deleteModal";
import { Button } from "../../../components/ui/button";
import { useDeleteCoupon } from "../mutations/deleteCouponMutation";




export default function EditCouponPage() {

  const { couponId } = useParams<{ couponId: string }>();
  const navigate = useNavigate();

  const {data: coupon, isLoading} = useGetCoupon(couponId as string)

  const { mutate: editCoupon, isPending} = useEditCoupon(couponId as string);

  const { mutate: deleteCategory, isPending: deletePending } = useDeleteCoupon(couponId);

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
              <CouponForm initialData={coupon} onSubmit={onSubmitFormEditCoupon} mode="edit" isLoading={isPending}>
              <div className="p-5 border rounded-lg flex justify-between items-center">
                <div>
                    <h1 className="font-semibold text-destructive text-lg">Eliminar categoria</h1>
                    <p className="text-muted-foreground">Elimine permanentemente a categoria</p>
                    <p className="text-destructive text-sm mt-1">*Esta ação não tem volta</p>
                </div>
                <DeleteModal 
                title="Eliminar coupon" 
                description="Todos os produtos associados a esta categoria serão eliminados permanentemente!"
                important="Esta ação não tem volta"
                onConfirm={() => deleteCategory()}>
                    <Button type="button" disabled={deletePending} variant={"destructive"}>Eliminar</Button>
                </DeleteModal>
                  
            </div>
              </CouponForm>
        </>
  )
}