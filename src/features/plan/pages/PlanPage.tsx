import { Check, Snowflake, X } from "lucide-react";
import HeaderSection from "../../../components/commons/Header";
import { Button } from "../../../components/ui/button";
import { useEffect } from "react";
import PaymentDialog from "../../../components/modal/renovPlanModal";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import queryClient from "../../../lib/reactquery/reactquery";
import { useStore } from "../../../provider/Store/StoreContext";
import { CalculeDaysLeft, getPlanStatusColor } from "../../../utils/fomat";




export default function PlanPage() {
  const store = useStore();


  const [searchParams, setSearchParams] = useSearchParams(); // Agora usamos setSearchParams para atualizar os parâmetros

  useEffect(() => {
    // Obtém o parâmetro 'paymentStatus' da URL
    const paymentStatus = searchParams.get('paymentStatus');
      if(paymentStatus) {
      // Verifica se o pagamento foi bem-sucedido e exibe um toast
      if (paymentStatus === 'success') {
        toast.success('Pagamento concluído com sucesso! Aguarde alguns segundos...');
        // Aguarda 10 segundos e invalida o cache da query 'plan'
        setTimeout(() => {
          toast.success("Plano atualizado com sucesso!");
          queryClient.invalidateQueries({ queryKey: ['plan']});
        }, 10000); // 10 segundos
      } else if (paymentStatus === 'error') {
        toast.error('Houve um problema com o pagamento. Tente novamente.');
      }        
      // Remover o parâmetro 'paymentStatus' da URL
      searchParams.delete('paymentStatus'); 
      setSearchParams(searchParams); // Atualiza a URL sem o parâmetro 'paymentStatus'
    }
  }, [searchParams, setSearchParams]);


  return(
    <>
      <HeaderSection title="Plano" description="Renove seu plano aqui!"/>

      <div className="w-full border shadow-md p-5 flex justify-between items-center">
        <div>
          <div className="flex gap-2 items-center text-violet-500">
              <Snowflake size={26}/>
              <h1 className="font-bold text-lg">Plano {store.StorePlan.plan}</h1>
              <span className={`${getPlanStatusColor(store.StorePlan.overdueDate)} text-sm text-destructive font-semibold mt-0.5`}>
                  {store.StorePlan.plan !== 'basic' ? (
                  (() => {
                    const daysLeft = CalculeDaysLeft(store.StorePlan.overdueDate);
                    return daysLeft && daysLeft > 0 ? `(${daysLeft} dias restantes)` : "Plano expirado";
                  })()
                    ) : "Seu plano expirou"}
              </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Até 5 produtos, 3 categorias, 1 colaborador e muito mais!</p>
        </div>
        <Button disabled={store.StorePlan.plan === "basic"}>Renovar</Button>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <div className="p-5 border shadow-md rounded-md">
              <h1 className="text-2xl text-violet-600 font-bold">Basic</h1>
              <div className="flex gap-2 items-end">
                <h1 className="text-4xl font-bold">0€</h1>
                <span className="text-muted-foreground text-sm">/para sempre</span>
              </div>
              <ul className="mt-5 text-muted-foreground text-sm space-y-3">
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Até 3 Categorias</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Até 5 Produtos</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Até 1 colaborador</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Até 5 noticias</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Todos os widgets</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Estatísticas avançadas</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Todos os métodos de pagamento</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Até 50€ em vendas mensais</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Até 1 servidor</span>
                </li>
                <li className="flex gap-2 items-center">
                  <X size={20} className="text-red-500"/>
                  <span>Varíaveis</span>
                </li>
                <li className="flex gap-2 items-center">
                  <X size={20} className="text-red-500"/>
                  <span>Domínio Próprio</span>
                </li>
                <li className="flex gap-2 items-center">
                  <X size={20} className="text-red-500"/>
                  <span>Descontos</span>
                </li>
                <li className="flex gap-2 items-center">
                  <X size={20} className="text-red-500"/>
                  <span>Integração com discord</span>
                </li>
                <li className="flex gap-2 items-center">
                  <X size={20} className="text-red-500"/>
                  <span>Editor de templates</span>
                </li>
              </ul>

              <div className="mt-10 flex justify-center">
                {store.StorePlan.plan !== "basic" && (
                  <Button className="px-10" variant={"outline"}>Atualizar</Button>
                )}
              </div>
          </div>


          <div className="p-5 border shadow-md rounded-md">
            <div className="flex gap-2 items-end">
              <h1 className="text-2xl text-violet-600 font-bold">Standard</h1>
            </div>
            
              <div className="flex gap-2 items-end">
                <h1 className="text-4xl font-bold">3,99€</h1>
                <span className="text-muted-foreground text-sm">/por mês</span>
              </div>
              <ul className="mt-5 text-muted-foreground text-sm space-y-3">
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Até 15 Categorias</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Até 25 Produtos</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Até 3 colaborador</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Notícias ilimitadas</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Todos os widgets</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Estatísticas avançadas</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Todos os métodos de pagamento</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Até 200€ em vendas mensais</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Até 4 servidor</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Varíaveis</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Domínio Próprio</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Descontos</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Integração com discord</span>
                </li>
                <li className="flex gap-2 items-center">
                  <X size={20} className="text-red-500"/>
                  <span>Editor de templates</span>
                </li>
              </ul>
              <div className="mt-10 flex justify-center">
              <PaymentDialog key={"standard"} plan="Standard" planKey="standard" price={3.99}>
                <Button className="px-10" variant={"outline"}>{store.StorePlan.plan === "standard" ? "Renovar" : "Atualizar"}</Button>
              </PaymentDialog>
              </div>
          </div>


          <div className="p-5 border shadow-md rounded-md">
          <div className="flex gap-2 items-end">
              <h1 className="text-2xl text-violet-600 font-bold">Premium</h1>
            </div>
              <div className="flex gap-2 items-end">
                <h1 className="text-4xl font-bold">9,99€</h1>
                <span className="text-muted-foreground text-sm">/por mês</span>
              </div>
              <ul className="mt-5 text-muted-foreground text-sm space-y-3">
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Categorias ilimitadas</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Produtos ilimitados</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Até 6 colaboradores</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Notícias ilimitadas</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Todos os widgets</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Estatísticas avançadas</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Todos os métodos de pagamento</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Sem limite de vendas mensais</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Servidores ilimitados</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Varíaveis</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Domínio Próprio</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Descontos</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Integração com discord</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Check size={20} className="text-green-500"/>
                  <span>Editor de templates</span>
                </li>
              </ul>

              <div className="mt-10 flex justify-center">
                <PaymentDialog key={"premium"} plan="Premium" planKey="premium" price={9.99}>
                  <Button className="px-10">{store.StorePlan.plan === "premium" ? "Renovar" : "Atualizar"}</Button>
                </PaymentDialog>
              </div>
          </div>
      </section>
    </>
  )
}