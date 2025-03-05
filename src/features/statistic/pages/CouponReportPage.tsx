import { useState } from "react";
import { columnsCupon } from "./CouponColumns";
import { useSearchParams } from "react-router-dom";
import { useGetTopCouponData } from "../api/store/statistic";
import HeaderSection from "../../../components/commons/Header";
import { DataTable } from "../../../components/ui/datatable";
import { DateRangePickComponent } from "../../../components/dataPickerRange";
import type { DateRange } from "react-day-picker";
import { t } from "../../../lib/reacti18next/i18n";




export default function CouponReportPage() {

    const [searchParams, setSearchParams] = useSearchParams();


    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    const [dateRange, setRangeDate] = useState<DateRange | undefined>(() => {
        const from = searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : undefined;
        const to = searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : undefined;

        return from || to ? { from, to } : undefined; // Retorna undefined se ambos forem falsy
    });

    const {data, isLoading} = useGetTopCouponData(dateRange, page);

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

      


    return(
        <>
            <HeaderSection 
                title={t("statisticPage.bestCoupons")} 
                description={t("statisticPage.couponsDetail.description")}
                backLink="../"/>
            <div className="flex gap-5 items-center flex-wrap">
                <DateRangePickComponent 
                onChangeRange={(range) => onDateChange(range)} 
                defaultRange="lastWeek"/>
            </div>
            <div className="mt-5">
                <DataTable data={data?.coupons || []} loading={isLoading} meta={data?.meta} columns={columnsCupon}/>
            </div>

        </>
    )
}