import { GiMoneyStack } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { columnsPayment } from "../../payments/pages/paymentColumns";
import HeaderSection from "../../../components/commons/Header";
import Cards from "../../../components/dashboard/DashboardCard";
import CardSection from "../../../components/commons/CardSections";
import { DataTable } from "../../../components/ui/datatable";
import { useGetRevenueSummary } from "../../stores/api/store/store";
import { useGetPayments } from "../../payments/api/store/payments";
import { useGetGraphData } from "../api/store/store";
import LoadingComponent from "../../../containers/LoadingComponent";
import CardEmptyComponent from "../../../components/commons/CardEmpty";
import ChartComponent from "../../../components/ui/ChartComponent";
import { FormatMoney } from "../../../utils/fomat";



export default function DashboardHomePage() {
  const { t } = useTranslation();


    const { data: graph = [], isLoading: graphLoading} = useGetGraphData();

    const { data : revenueSummary, isLoading: revenueLoading } = useGetRevenueSummary();

    const {data: payments, isLoading: paymentsLoading } = useGetPayments();



    return(
        <div className="w-full">
        <HeaderSection 
          title={t("dashboardPage.title")}
          description={t("dashboardPage.description")}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <Cards
            title={t("dashboardPage.dailyEarnings")}
            isLoading={revenueLoading}
            price={FormatMoney(revenueSummary?.dailyRevenue || 0)}
            icon={GiMoneyStack}
          />
          <Cards
            title={t("dashboardPage.monthlyEarnings")}
            isLoading={revenueLoading}
            price={FormatMoney(revenueSummary?.monthlyRevenue || 0)}
            icon={GiMoneyStack}
          />
          <Cards
            title={t("dashboardPage.dailySales")}
            isLoading={revenueLoading}
            price={revenueSummary?.dailySales || 0}
            icon={GiMoneyStack}
          />
          <Cards
            title={t("dashboardPage.monthlySales")}
            isLoading={revenueLoading}
            price={revenueSummary?.monthlySales || 0}
            icon={GiMoneyStack}
          />
          
            </div>
            <div className="w-full mt-5">
                <CardSection title={t("dashboardPage.last7Days")}>
                  {graphLoading ? (
                    <LoadingComponent/>
                  ) : graph && graph.length > 0 ? (
                      <ChartComponent graph={graph}/>
                  ) : (
                      <CardEmptyComponent title={t("noFound.title")} description={t("noFound.description")}/>
                  )}
                  
                </CardSection>
                </div>
            <div className="mt-5">
              <CardSection title={t("dashboardPage.lastPayments")} hAuto link="payments">
                <DataTable data={payments?.payments || []} loading={paymentsLoading} columns={columnsPayment}/>
              </CardSection>
            </div>
            </div>
    )
}