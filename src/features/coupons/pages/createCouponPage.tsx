import HeaderSection from "../../../components/commons/Header";
import { useCreateCoupon } from "../mutations/CreateCouponMutation";
import CouponForm from "../components/CouponForm";
import type { CouponFormData } from "../schema/CouponsSchema";
import { toast } from "sonner";

export default function CreateCouponPage() {

    const {mutate: createCoupon, isPending} = useCreateCoupon();

    function onSubmitFormCreateCoupon(data: CouponFormData) {
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
        
        createCoupon(data);
    }

    return (
        <>
            <HeaderSection title="Crie seu cupom!" description="Aumente as vendas de sua loja!" backLink="../" />
            <CouponForm onSubmit={onSubmitFormCreateCoupon} mode="create" isLoading={isPending}/>
        </>
    );
}
