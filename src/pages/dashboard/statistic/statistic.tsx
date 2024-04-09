import { GiMoneyStack } from "react-icons/gi";
import HeaderSection from "../../../components/commons/Header";
import Cards from "../../../components/dashboard/DashboardCard";
import CardSection from "../../../components/commons/CardSections";
import BestCategorieTable from "../../../components/tables/bestCategorie/bestCategorieTable";
import BestCostumerTable from "../../../components/tables/bestCostumer/bestCostumer";
import BestProductTable from "../../../components/tables/bestProduct/bestProduct";
import BestServerTable from "../../../components/tables/bestServer/bestServer";




export default function StatisticPage() {
    return(
        <>
        <HeaderSection title={'Estatística'} description="Veja detalhadamente o caminho de sua loja"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Cards
            title={"Vendas de sempre"}
            symbol="€"
            price={0}
            icon={GiMoneyStack}
          />
          <Cards
            title={"Vendas do ano"}
            symbol="€"
            price={0}
            icon={GiMoneyStack}
          />
          <Cards
            title={"Vendas do mês"}
            symbol="€"
            price={0}
            icon={GiMoneyStack}
          />
          <Cards
            title={"Vendas do dia"}
            symbol="€"
            price={0}
            icon={GiMoneyStack}
          />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                <CardSection title="Top categorias" hAuto link="#">
                    <BestCategorieTable/>
                </CardSection>

                <CardSection title="Top costumer" hAuto link="#">
                    <BestCostumerTable/>
                </CardSection>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                <CardSection title="Top Product" hAuto link="#">
                    <BestProductTable/>
                </CardSection>

                <CardSection title="Top Server" hAuto link="#">
                    <BestServerTable/>
                </CardSection>
            </div>
        </>
    )
}