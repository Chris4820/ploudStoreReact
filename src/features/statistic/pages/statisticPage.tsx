import { GiMoneyStack } from "react-icons/gi";
import { useGetCategoryData, useGetTopCouponData, useGetTopCustomersData } from "../../../api/store/store/statistic";
import HeaderSection from "../../../components/commons/Header";
import Cards from "../../../components/dashboard/DashboardCard";
import CardSection from "../../../components/commons/CardSections";
import { DataTable } from "../../../components/ui/datatable";
import { columnsCategories } from "./CategorieColumns";
import { columnsCustomer } from "./customersColumns";
import { columnsCupon } from "./CouponColumns";




export default function StatisticPage() {

    const {data: categoriesData, isLoading: categoriesLoading} = useGetCategoryData(1);

    const {data: customersData, isLoading: customersLoading} = useGetTopCustomersData(1);

    const {data: couponData, isLoading: couponLoading} = useGetTopCouponData(1);

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
                <CardSection title="Categorias mais vendidas" hAuto link="categories">
                    <DataTable data={categoriesData?.categories || []} loading={categoriesLoading} columns={columnsCategories}/>
                </CardSection>

                <CardSection title="Melhores clientes" hAuto link="customers">
                    <DataTable data={customersData?.customers || []} loading={customersLoading} columns={columnsCustomer}/>
                </CardSection>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                <CardSection title="Melhores coupons" hAuto link="coupons">
                    <DataTable data={couponData?.coupons || []} loading={couponLoading} columns={columnsCupon}/>
                </CardSection>
            </div>
        </>
    )
}