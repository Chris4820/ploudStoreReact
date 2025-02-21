import { useParams } from "react-router-dom";
import HeaderSection from "../../../../components/commons/Header";
import SubHeaderSection from "../../../../components/commons/subHeader";
import { useGetPaymentDetail } from "../../api/store/payments";
import LoadingComponent from "../../../../containers/LoadingComponent";
import NotFoundComponent from "../../../../containers/404Component";
import CardEmptyComponent from "../../../../components/commons/CardEmpty";





export default function PaymentDetailsPage() {


  const { id } = useParams<{ id: string }>();



  const {data: payment, isLoading } = useGetPaymentDetail(id as string);

  if(isLoading) {
    return <LoadingComponent/>
  }

  if(!payment) {
    return <NotFoundComponent
              title="Pagamento não encontrado"
              description="Esse pagamento não foi encontrado!"/>
  }

  return(
    <>
      <HeaderSection
      title="Detalhes de pagamento"
      description="Veja os detalhes do pagamento"
      backLink="../"


      />

      <section className="border rounded-lg p-5 space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="border rounded-lg p-5 space-y-2">
            <SubHeaderSection
            title="Pagamento"
            description="Confira os detalhes do pagamento"/>
            <h1>ID pagamento: <span className="font-semibold">{payment.id}</span></h1>
            <h1>Data criação: <span className="font-semibold">{payment.createdAt}</span></h1>
          </div>
          <div className="border rounded-lg p-5 space-y-2">
            <SubHeaderSection
            title="Cliente"
            description="Confira os detalhes do cliente"/>
            <h1>Nome <span className="font-semibold">{payment.clientIdentifier || "Indefinido"}</span></h1>
            <h1>Email <span className="font-semibold">{payment.clientEmail || "Indefinido"}</span></h1>
            <h1>Telefone <span className="font-semibold">25/05/2002</span></h1>
          </div>
        </div>

        <div className="border rounded-lg p-5">
          <SubHeaderSection
          title="Produtos"
          description="Confira os detalhes do produtos"/>
          

            {payment.paymentItems && payment.paymentItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {payment.paymentItems.map((item, index) => (
                <div key={index} className="border rounded-lg p-2">
                <div>
                  <h1>Pacote: <span className="font-semibold">{item.name}</span></h1>
                  <h1>Quantidade: <span className="font-semibold">2</span></h1>
                  <h1>Preço unitário: <span className="font-semibold">{item.price}</span></h1>
                  <div className="mt-5">
                    <h1>Estado: <span className="bg-green-900/50 border-green-900 inline-block text-white rounded-full border-2 px-3 py-0.5 text-sm font-semibold">Ativado</span></h1>
                    <h1>Ativado em: <span className="font-semibold">25/05/2022</span></h1>
                  </div>
                </div>
              </div>
              ))}
              </div>
            ): (
              <div className="flex justify-center mt-5">
                <CardEmptyComponent
                title="Nenhum item"
                description="Não foi econtrado nenhum item nesta venda"/>
              </div>
            )}

          

        </div>

      </section>

      
    </>
  )


}