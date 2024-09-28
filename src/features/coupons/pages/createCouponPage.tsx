import HeaderSection from "../../../components/commons/Header";
import { useCreateCoupon } from "../mutations/CreateCouponMutation";
import CouponForm from "../components/CouponForm";
import type { CouponFormData } from "../schema/CouponsSchema";

export default function CreateCouponPage() {

    const {mutate: createCoupon, isPending} = useCreateCoupon();

    function onSubmitFormCreateCoupon(data: CouponFormData) {
        createCoupon(data);
    }

    return (
        <>
            <HeaderSection title="Crie seu cupom!" description="Aumente as vendas de sua loja!" backLink="../" />
            <CouponForm onSubmit={onSubmitFormCreateCoupon} mode="create" isLoading={isPending}/>
        </>
    );
}
