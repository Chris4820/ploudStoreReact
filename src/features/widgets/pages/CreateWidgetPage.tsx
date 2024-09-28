import { useNavigate } from "react-router-dom";
import HeaderSection from "../../../components/commons/Header";
import WidgetCardComponent from "../components/WidgetCard";
import { CreditCard, Goal, Package, UsersRound } from "lucide-react";







export default function CreateWidgetPage() {
  const navigate = useNavigate();

  return(
    <>
      <HeaderSection backLink="../" title="Criar Widget" description="Escolha o tipo de widget que deseja criar!"/>
      
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
      <WidgetCardComponent 
        icon={Goal}
        title="Progresso da Meta" 
        description="Exiba o progresso das metas de vendas para seus clientes, incentivando a conclusão de objetivos." 
        onClick={() => navigate('goal')}
      />

      <WidgetCardComponent 
        icon={Package}
        title="Pacote em Destaque" 
        description="Destaque um pacote de produtos específico para atrair mais vendas e atenção dos clientes." 
        onClick={() => navigate('featuredProduct')}
      />

      <WidgetCardComponent 
        icon={UsersRound}
        title="Clientes Top" 
        description="Mostre os principais clientes do seu negócio, reforçando a fidelidade e reconhecimento." 
        onClick={() => navigate('topCustomers')}
      />

      <WidgetCardComponent 
        icon={CreditCard}
        title="Pagamentos recentes" 
        description="Mostre os principais clientes do seu negócio, reforçando a fidelidade e reconhecimento." 
        onClick={() => navigate('recentPayments')}
      />

      </div>
    </>
  )
}