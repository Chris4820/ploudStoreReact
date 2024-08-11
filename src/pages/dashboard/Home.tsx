import { GiMoneyStack } from "react-icons/gi";
import HeaderSection from "../../components/commons/Header";
import Cards from "../../components/dashboard/DashboardCard";
import { CgSpinner } from "react-icons/cg";
import CardSection from "../../components/commons/CardSections";
import SalesChart from "../../containers/graphicLast7Days";
import { useTranslation } from "react-i18next";
import { useGetRevenueSummary } from "../../api/store/store";
import NotificationComponentHome from "../../components/NotificationsComponent";
import PaymentTable from "../../components/tables/payments/PaymentsTable";
import { useGetPayments } from "../../api/store/store/payments";



export default function Home() {
  const { t } = useTranslation();

    const { data : revenueSummary, isLoading: revenueLoading } = useGetRevenueSummary();

    const {data: payments, isLoading: paymentsLoading } = useGetPayments();

    return(
        <>
        <HeaderSection title={t("dashboard")} description="Description"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Cards
            title={t("dashboardPage.dailyEarnings")}
            symbol="€"
            price={revenueLoading ? <CgSpinner className="animate-spin"/> : revenueSummary?.dailyRevenue || 0}
            icon={GiMoneyStack}
          />
          <Cards
            title={t("dashboardPage.monthlyEarnings")}
            symbol="€"
            price={revenueLoading ? <CgSpinner className="animate-spin"/> : revenueSummary?.monthlyRevenue || 0}
            icon={GiMoneyStack}
          />
          <Cards
            title={t("dashboardPage.dailySales")}
            symbol=""
            price={revenueLoading ? <CgSpinner className="animate-spin"/> : revenueSummary?.dailySales || 0}
            icon={GiMoneyStack}
          />
          <Cards
            title={t("dashboardPage.monthlySales")}
            symbol=""
            price={revenueLoading ? <CgSpinner className="animate-spin"/> : revenueSummary?.monthlySales || 0}
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
                  <NotificationComponentHome/>
                </div>
            </div>
            <div className="mt-5">
              <CardSection title="Pagamentos recentes" hAuto link="payments">
                <PaymentTable payments={payments?.payments || []} isLoading={paymentsLoading}/>
              </CardSection>
            </div>
        </>
    )
}