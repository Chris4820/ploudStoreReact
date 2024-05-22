import BackComponent from "../../../components/commons/BackComponent";
import HeaderSection from "../../../components/commons/Header";
import CheckOutForm from "../../../containers/dashboard/forms/checkoutForm";




export default function CheckoutPage() {
    return(
        <>
        <HeaderSection title="Checkout" description="Configure as regras do checkout de sua loja"/>
        <BackComponent text="Voltar para o dashboard" toLink="#"/>
        <CheckOutForm/>
        </>
    )
}