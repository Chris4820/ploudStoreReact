import { GiMoneyStack } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { columnsPayment } from "../../payments/pages/paymentColumns";
import HeaderSection from "../../../components/commons/Header";
import Cards from "../../../components/dashboard/DashboardCard";
import CardSection from "../../../components/commons/CardSections";
import { DataTable } from "../../../components/ui/datatable";
import { useGetRevenueSummary } from "../../stores/api/store/store";
import { useGetPayments } from "../../payments/api/store/payments";
import { useGetGraphData, useGetNotifications } from "../api/store/store";
import LoadingComponent from "../../../containers/LoadingComponent";
import CardEmptyComponent from "../../../components/commons/CardEmpty";
import { Coins, Goal } from "lucide-react";
import ChartComponent from "../../../components/ui/ChartComponent";



export default function DashboardHomePage() {
  const { t } = useTranslation();


    const { data: graph = [], isLoading: graphLoading} = useGetGraphData();

    const { data : revenueSummary, isLoading: revenueLoading } = useGetRevenueSummary();

    const {data: payments, isLoading: paymentsLoading } = useGetPayments();

    const { data: notifications = [], isLoading: notificationsLoading } = useGetNotifications(); 

    return(
        <>
        <HeaderSection 
          title="Dashboard"
          description="Visão geral do desempenho da sua loja e métricas importantes"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Cards
            title={t("dashboardPage.dailyEarnings")}
            symbol="€"
            isLoading={revenueLoading}
            price={revenueSummary?.dailyRevenue || 0}
            icon={GiMoneyStack}
          />
          <Cards
            title={t("dashboardPage.monthlyEarnings")}
            symbol="€"
            isLoading={revenueLoading}
            price={revenueSummary?.monthlyRevenue || 0}
            icon={GiMoneyStack}
          />
          <Cards
            title={t("dashboardPage.dailySales")}
            symbol=""
            isLoading={revenueLoading}
            price={revenueSummary?.dailySales || 0}
            icon={GiMoneyStack}
          />
          <Cards
            title={t("dashboardPage.monthlySales")}
            symbol=""
            isLoading={revenueLoading}
            price={revenueSummary?.monthlySales || 0}
            icon={GiMoneyStack}
          />
          
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
                <div className="col-span-2">
                <CardSection title="Vendas dos últimos 7 dias" className="h-[250px]">
                  {graphLoading ? (
                    <LoadingComponent/>
                  ) : graph && graph.length > 0 ? (
                      <ChartComponent graph={graph}/>
                  ) : (
                      <CardEmptyComponent title="Sem dados" description="Não foram encontrados dados"/>
                  )}
                  
                </CardSection>
                </div>
                <div className="col-span-1">
                  <CardSection title="Notificações Gerais">
                  {notificationsLoading ? (
                      <LoadingComponent />
                    ) : notifications && notifications.length > 0 ? (
                      <ul className="mt-[-10px] space-y-1">
                        {notifications.map((notification, index) => (
                          <>
                          <li key={index} className="flex justify-start gap-5 items-center">
                            {notification.type === "GOAL" ? (
                              <Goal size={26} className="text-violet-600"/>
                            ) : (
                              <Coins/>
                            )}
                            <div className="text-start">
                              <h1 className="font-semibold text-base">{notification.title}</h1>
                              <p className="text-sm">{notification.description}</p>
                            </div>
                          </li>
                          <hr/>
                          </>
                        ))}
                      </ul>
                    ) : (
                      <CardEmptyComponent 
                        title="Sem notificações"
                        description="Parece que ainda não tem nenhuma notificação"/>
                    )}
                  </CardSection>
                </div>
            </div>
            <div className="mt-5">
              <CardSection title="Pagamentos recentes" hAuto link="payments">
                <DataTable data={payments?.payments || []} loading={paymentsLoading} columns={columnsPayment}/>
              </CardSection>
            </div>
        </>
    )
}