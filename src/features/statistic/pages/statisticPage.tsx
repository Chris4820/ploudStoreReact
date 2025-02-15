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
      <div className="flex items-center justify-between">
        <HeaderSection title={'Estatística'} description="Veja detalhadamente o caminho de sua loja" />
        <DateRangePickComponent 
          onChangeRange={(date) => onDateChange(date)}
          defaultRange="Última Semana" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                <CardSection title="Categorias mais vendidas" hAuto link="categories">
                    <DataTable data={categoriesData?.categories || []} loading={categoriesLoading} columns={columnsCategories}/>
                </CardSection>

                <div className="grid grid-cols-2 items-start gap-5">
                  <Cards 
                    title={"Vendas Totais"} 
                    symbol="€" 
                    price={storeStat?.totalSales || 0}
                    isLoading={storeStatLoading} 
                    icon={GiMoneyStack} />
                  <Cards 
                    title={"Itens Vendidos"} 
                    symbol="" 
                    isInt
                    price={storeStat?.totalItemsSold || 0} 
                    isLoading={storeStatLoading}
                    icon={GiShoppingCart} />
                  <Cards 
                    title={"Acessos na loja"} 
                    symbol="" 
                    price={0} 
                    isInt 
                    isLoading={false}
                    icon={User2Icon} />
                  <Cards 
                    title={"Total de Retornos"} 
                    symbol="%" 
                    price={storeStat?.returnRate || 0} 
                    isInt 
                    isLoading={storeStatLoading}
                    icon={CgUndo} />
                </div>

                <CardSection title="Melhores clientes" hAuto link="customers">
                    <DataTable data={customersData?.customers || []} loading={customersLoading} columns={columnsCustomer}/>
                </CardSection>

                <CardSection title="Melhores coupons" hAuto link="coupons">
                    <DataTable data={couponData?.coupons || []} loading={couponLoading} columns={columnsCupon}/>
                </CardSection>
            </div>
    </>
  );
}
