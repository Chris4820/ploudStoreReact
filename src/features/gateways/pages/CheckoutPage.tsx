import HeaderSection from "../../../components/commons/Header";
import GatewayCard from "../components/GatewayCard";






export default function CheckoutPage() {
  return(
    <>
      <HeaderSection title="Checkout" description="Configure o checkout de sua loja aqui!"/>
      <section className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <GatewayCard
          name="Paypal"
          description="Integre o paypal na sua loja"
          imageUrl="/gateways/Paypal-Logo.webp"
          link="paypal"
        />
          
        <GatewayCard
          name="Stripe"
          description="Integre o paypal na sua loja"
          imageUrl="/gateways/Stripe-Logo.webp"
          link="stripe"
        />

        <GatewayCard
          name="Mercado Pago"
          description="Integre o paypal na sua loja"
          imageUrl="/gateways/Mercadopago-Logo.svg"
          link="mercadopago"
        />

        <GatewayCard
          name="Pag Seguro"
          description="Integre o paypal na sua loja"
          imageUrl="/gateways/Pagseguro-Logo.webp"
          link="pagseguro"
        />

      <GatewayCard
          name="Mollie"
          description="Integre o paypal na sua loja"
          imageUrl="/gateways/Mollie-Logo.png"
          link="mollie"
        />
      </section>
    </>
  )
}