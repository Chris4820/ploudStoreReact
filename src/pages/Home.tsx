import { GiMoneyStack } from "react-icons/gi";
import HeaderSection from "../components/commons/Header";
import Cards from "../components/dashboard/DashboardCard";
import { useGetRevenueSummary } from "../api/store/store";
import { CgSpinner } from "react-icons/cg";
import CardSection from "../components/commons/CardSections";
import SalesChart from "../containers/graphicLast7Days";


export default function Home() {

    const { data : revenueSummary, isLoading } = useGetRevenueSummary();
    console.log(revenueSummary)
    return(
        <>
        <HeaderSection title="Dashboard" description="Description"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Cards
            title="Ganhos diários"
            symbol="€"
            price={isLoading ? <CgSpinner className="animate-spin"/> : revenueSummary?.dailyRevenue || 0}
            icon={GiMoneyStack}
          />
          <Cards
            title="Ganhos Mensal"
            symbol="€"
            price={isLoading ? <CgSpinner className="animate-spin"/> : revenueSummary?.monthlyRevenue || 0}
            icon={GiMoneyStack}
          />
          <Cards
            title="Vendas diárias"
            symbol=""
            price={isLoading ? <CgSpinner className="animate-spin"/> : revenueSummary?.dailySales || 0}
            icon={GiMoneyStack}
          />
          <Cards
            title="Vendas mensais"
            symbol=""
            price={isLoading ? <CgSpinner className="animate-spin"/> : revenueSummary?.monthlySales || 0}
            icon={GiMoneyStack}
          />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                <div className="col-span-2">
                <CardSection title="Vendas dos últimos 7 dias">
                    <SalesChart/>
                </CardSection>
                </div>
                <div>
                <CardSection title="Vendas dos últimos 7 dias">
                    <SalesChart/>
                </CardSection>
                </div>
            </div>
        </>
    )
}