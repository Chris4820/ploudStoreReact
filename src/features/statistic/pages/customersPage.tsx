import { useState } from "react";
import { useGetTopCustomersData } from "../api/store/statistic";
import { columnsCustomer } from "./customersColumns";
import HeaderSection from "../../../components/commons/Header";
import { DataTable } from "../../../components/ui/datatable";
import { useSearchParams } from "react-router-dom";
import type { DateRange } from "react-day-picker";
import { DateRangePickComponent } from "../../../components/dataPickerRange";




export default function CustomersPage() {

    const [searchParams, setSearchParams] = useSearchParams();

    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    const [dateRange, setRangeDate] = useState<DateRange | undefined>(() => {
        const from = searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : undefined;
        const to = searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : undefined;

        return from || to ? { from, to } : undefined; // Retorna undefined se ambos forem falsy
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

      const {data, isLoading} = useGetTopCustomersData(dateRange, page);

    return(
        <>
            <HeaderSection 
                title="Melhores clientes" 
                description="Consulte aqui os melhores clientes de sua loja!!"
                backLink="../"/>
            <div className="flex gap-5 items-center flex-wrap">
                <DateRangePickComponent 
                    onChangeRange={(range) => onDateChange(range)} 
                    defaultRange="Desde sempre"/>
            </div>
            <div className="mt-5">
                <DataTable data={data?.customers || []} loading={isLoading} meta={data?.meta} columns={columnsCustomer}/>
            </div>

        </>
    )
}