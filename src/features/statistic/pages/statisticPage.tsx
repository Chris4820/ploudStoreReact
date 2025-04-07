import { useGetCategoryData, useGetTopCouponData, useGetTopCustomersData, useStoreStat } from "../api/store/statistic";
import { useState } from "react";
import { addDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";
import HeaderSection from "../../../components/commons/Header";
import { DateRangePickComponent } from "../../../components/dataPickerRange";
import CardSection from "../../../components/commons/CardSections";
import { DataTable } from "../../../components/ui/datatable";
import Cards from "../../../components/dashboard/DashboardCard";
import { GiMoneyStack, GiShoppingCart } from "react-icons/gi";
import { User2Icon } from "lucide-react";
import { CgUndo } from "react-icons/cg";
import { columnsCategories } from "./CategorieColumns";
import { columnsCustomer } from "./customersColumns";
import { columnsCupon } from "./CouponColumns";
import { FormatMoney } from "../../../utils/fomat";
import { t } from "../../../lib/reacti18next/i18n";

export default function StatisticPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [dateRange, setRangeDate] = useState<DateRange | undefined>(() => {
    const from = searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : addDays(new Date(), -7);
    const to = searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : new Date();
    
    // Define as horas para o início e o final do dia
    from.setHours(0, 0, 0, 0);
    to.setHours(23, 59, 59, 999);
    
    return { from, to };
  });

  function onDateChange(dateRange: DateRange) {
    const updatedParams = new URLSearchParams(searchParams);
    if(!dateRange.from || !dateRange.to) {
      updatedParams.delete("startDate");
      updatedParams.delete("endDate");
    }else {
      if (dateRange.from) updatedParams.set("startDate", dateRange.from.toISOString());
      if (dateRange.to) updatedParams.set("endDate", dateRange.to.toISOString());

    }
    setRangeDate(dateRange);
    setSearchParams(updatedParams);
  }


  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoryData(dateRange, 1);
  const { data: customersData, isLoading: customersLoading } = useGetTopCustomersData(dateRange, 1);
  const { data: couponData, isLoading: couponLoading } = useGetTopCouponData(dateRange, 1);
  const {data: storeStat, isLoading: storeStatLoading} = useStoreStat(dateRange);


  return (
    <>
      <div className="flex items-center flex-wrap justify-between">
        <HeaderSection title={t('statisticPage.title')} description={t('statisticPage.description')} />
        <DateRangePickComponent 
          onChangeRange={(date) => onDateChange(date)}
          defaultRange="lastWeek" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                <CardSection title={t('statisticPage.bestCategories')} hAuto>
                    <DataTable data={categoriesData || []} loading={categoriesLoading} columns={columnsCategories}/>
                </CardSection>

                <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-5">
                  <Cards 
                    title={t('statisticPage.totalSales')} 
                    price={FormatMoney(storeStat?.totalSales || 0)}
                    isLoading={storeStatLoading} 
                    icon={GiMoneyStack} />
                  <Cards 
                    title={t('statisticPage.itemsSold')} 
                    price={storeStat?.totalItemsSold || 0} 
                    isLoading={storeStatLoading}
                    icon={GiShoppingCart} />
                  <Cards 
                    title={t('statisticPage.storeVisits')}
                    price={0} 
                    isInt 
                    isLoading={false}
                    icon={User2Icon} />
                  <Cards 
                    title={t('statisticPage.totalReturns')}
                    price={`${storeStat?.returnRate || 0}%`}
                    isInt 
                    isLoading={storeStatLoading}
                    icon={CgUndo} />
                </div>

                <CardSection title={t('statisticPage.bestCustomers')} hAuto>
                    <DataTable data={customersData || []} loading={customersLoading} columns={columnsCustomer}/>
                </CardSection>

                <CardSection title={t('statisticPage.bestCoupons')} hAuto>
                    <DataTable data={couponData || []} loading={couponLoading} columns={columnsCupon}/>
                </CardSection>
            </div>
    </>
  );
}
