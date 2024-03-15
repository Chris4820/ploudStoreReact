import { GiMoneyStack } from "react-icons/gi";
import HeaderSection from "../components/commons/Header";
import Cards from "../components/dashboard/DashboardCard";



export default function About() {
    return(
        <>
            <HeaderSection title="Dashboard" description="Verifique seus rendimentos de forma rápida"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <Cards
                title="Vendas dárias"
                price={25}
                symbol="€"
                icon={GiMoneyStack}
                />
                <Cards
                title="Vendas dárias"
                price={25}
                symbol="€"
                icon={GiMoneyStack}
                />
                <Cards
                title="Vendas dárias"
                price={25}
                symbol=""
                icon={GiMoneyStack}
                />
                <Cards
                title="Vendas dárias"
                price={25}
                symbol=""
                icon={GiMoneyStack}
                />

            </div>
        </>
    )
}