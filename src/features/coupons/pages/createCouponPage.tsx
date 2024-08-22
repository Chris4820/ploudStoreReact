import HeaderSection from "../../../components/commons/Header";
import { CreateCouponFormData } from "../schema/CouponsSchema";
import { useCreateCoupon } from "../mutations/CreateCouponMutation";
import CouponForm from "../components/CouponForm";

export default function CreateCouponPage() {

    const {mutate: createCoupon, isPending} = useCreateCoupon();

    function onSubmitFormCreateCoupon(data: CreateCouponFormData) {
        createCoupon(data);
    }

    return (
        <>
            <HeaderSection title="Crie seu cupom!" description="Aumente as vendas de sua loja!" backLink />
            <CouponForm onSubmit={onSubmitFormCreateCoupon} mode="create"/>
        </>
    );
}
